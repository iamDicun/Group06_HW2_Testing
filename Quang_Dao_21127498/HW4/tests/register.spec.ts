import { expect, test, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

type Category = 'Positive' | 'Negative' | 'Boundary/Edge case';

type RegisterCase = {
  case_id: string;
  category: Category;
  purpose: string;
  preconditions: string;
  test_steps: string;
  expected_result: string;
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  expected_route: string;
  expected_error_field: string;
  expected_validation_key: string;
};

const registerCsvPath = path.join(process.cwd(), 'test-data', 'register.csv');
const registerPageUrl = 'http://localhost:5173/register';

const requiredColumns = [
  'case_id',
  'category',
  'purpose',
  'preconditions',
  'test_steps',
  'expected_result',
  'full_name',
  'email',
  'password',
  'confirm_password',
  'expected_route',
  'expected_error_field',
  'expected_validation_key',
] as const;

const validationMessageByKey: Record<string, string> = {
  required: 'bắt buộc',
  email_format: 'email không hợp lệ',
  email_unique: 'đã tồn tại',
  password_strength_uppercase: 'chữ hoa',
  password_strength_digit: 'chữ số',
  password_strength_special: 'ký tự đặc biệt',
  password_min_length: 'tối thiểu 8 ký tự',
  password_mismatch: 'không khớp',
};

function parseCsv(content: string): Array<Record<string, string>> {
  const lines = content.replace(/\r\n/g, '\n').trim().split('\n');
  if (lines.length === 0) {
    return [];
  }

  const parseLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      const nextCharacter = line[index + 1];

      if (character === '"') {
        if (inQuotes && nextCharacter === '"') {
          current += '"';
          index += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (character === ',' && !inQuotes) {
        values.push(current);
        current = '';
        continue;
      }

      current += character;
    }

    values.push(current);
    return values.map((value) => value.trim());
  };

  const headers = parseLine(lines[0]);
  const missingColumns = requiredColumns.filter((column) => !headers.includes(column));
  if (missingColumns.length > 0) {
    throw new Error(`register.csv is missing required columns: ${missingColumns.join(', ')}`);
  }

  return lines.slice(1).filter(Boolean).map((line, lineIndex) => {
    const cells = parseLine(line);
    if (cells.length !== headers.length) {
      throw new Error(`register.csv row ${lineIndex + 2} has ${cells.length} cells, expected ${headers.length}`);
    }

    return headers.reduce<Record<string, string>>((row, header, columnIndex) => {
      row[header] = cells[columnIndex] ?? '';
      return row;
    }, {});
  });
}

function loadRegisterCases(): RegisterCase[] {
  if (!fs.existsSync(registerCsvPath)) {
    throw new Error(`Cannot find test data file at ${registerCsvPath}`);
  }

  const rawCases = parseCsv(fs.readFileSync(registerCsvPath, 'utf8'));
  const duplicateCaseIds = rawCases
    .map((record) => record.case_id)
    .filter((caseId, index, caseIds) => caseIds.indexOf(caseId) !== index);

  if (duplicateCaseIds.length > 0) {
    throw new Error(`register.csv contains duplicate case IDs: ${[...new Set(duplicateCaseIds)].join(', ')}`);
  }

  if (rawCases.length < 12) {
    throw new Error(`register.csv must contain at least 12 records, found ${rawCases.length}`);
  }

  return rawCases.map((record) => {
    const category = record.category as Category;
    if (!['Positive', 'Negative', 'Boundary/Edge case'].includes(category)) {
      throw new Error(`Unsupported category "${record.category}" in case ${record.case_id}`);
    }



    const optionalColumns = [
  'expected_error_field',
  'expected_validation_key',
  'expected_route',
  'full_name',
  'email',
  'password',
  'confirm_password'
];

const missingRequiredFields = requiredColumns.filter(
  (column) => record[column]?.trim() === '' && !optionalColumns.includes(column)
);
    if (missingRequiredFields.length > 0) {
      throw new Error(`Case ${record.case_id} is missing required fields: ${missingRequiredFields.join(', ')}`);
    }

    return {
      case_id: record.case_id,
      category,
      purpose: record.purpose,
      preconditions: record.preconditions,
      test_steps: record.test_steps,
      expected_result: record.expected_result,
      full_name: record.full_name,
      email: record.email,
      password: record.password,
      confirm_password: record.confirm_password,
      expected_route: record.expected_route,
      expected_error_field: record.expected_error_field,
      expected_validation_key: record.expected_validation_key,
    };
  });
}

function getFieldLocator(page: Page, index: number) {
  return page.getByRole('textbox').nth(index);
}

async function fillRegisterForm(page: Page, registerCase: RegisterCase) {
  const fullNameInput = getFieldLocator(page, 0);
  const emailInput = getFieldLocator(page, 1);
  const passwordInput = getFieldLocator(page, 2);

  await fullNameInput.fill(registerCase.full_name);
  await emailInput.fill(registerCase.email);
  await passwordInput.fill(registerCase.password);

  await expect(fullNameInput).toHaveValue(registerCase.full_name);
  await expect(emailInput).toHaveValue(registerCase.email);
  await expect(passwordInput).toHaveValue(registerCase.password);
}

function getValidationMessage(registerCase: RegisterCase): string {
  if (registerCase.expected_validation_key && validationMessageByKey[registerCase.expected_validation_key]) {
    return validationMessageByKey[registerCase.expected_validation_key];
  }

  return registerCase.expected_error_field;
}

const registerCases = loadRegisterCases();

test.describe('FR-01 - Đăng ký tài khoản', () => {
  for (const registerCase of registerCases) {
    test(`${registerCase.case_id} - ${registerCase.purpose}`, async ({ page }) => {
      await page.goto(registerPageUrl);

      await expect(page.getByRole('heading', { name: /Đăng Ký Tài Khoản/i })).toBeVisible();

      await fillRegisterForm(page, registerCase);

      await page.locator('form').evaluate((form) => (form as HTMLFormElement).requestSubmit());

      await expect(page).toHaveURL(/\/register(?:\?.*)?$/);
      await expect(page.getByRole('heading', { name: /Đăng Ký Tài Khoản/i })).toBeVisible();
      await expect(page.getByText(/Mật khẩu quá yếu!/i)).toBeVisible();
    });
  }
});