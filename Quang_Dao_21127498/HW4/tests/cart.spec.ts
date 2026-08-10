// utils/cart-page.ts
// Locator được suy ra từ CHỮ/NHÃN nêu tường minh trong Eshop_README.md (FR-07, FR-21, FR-23).
// Mọi chỗ đánh dấu TODO(verify) là suy đoán hợp lý nhưng CHƯA được xác nhận trên UI thật —
// bạn PHẢI mở app + F12 để xác nhận/sửa trước khi chạy test này.

import type { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  /** README FR-23: link "Giỏ hàng" trên Navbar, có badge số lượng. */
  async goto(): Promise<void> {
    await this.page.getByRole('link', { name: /Giỏ hàng/i }).click();
  }

  /** README FR-07: 5 cột — Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. */
  columnHeader(name: string): Locator {
    // TODO(verify): nếu giao diện KHÔNG dùng thẻ <table> thật (mà là div/grid),
    // đổi getByRole('columnheader', ...) thành this.page.getByText(name, { exact: true }).
    return this.page.getByRole('columnheader', { name });
  }

  /** Một dòng sản phẩm trong giỏ, xác định qua tên sản phẩm hiển thị trên dòng đó. */
  row(productName: string): Locator {
    // TODO(verify): nếu layout là danh sách card thay vì <table>/<tr>,
    // đổi getByRole('row', ...) thành page.locator('[data-cart-item]', { hasText: productName })
    // hoặc selector tương đương sau khi F12 xem cấu trúc DOM thật.
    return this.page.getByRole('row', { name: new RegExp(productName) });
  }

  allRows(): Locator {
    // TODO(verify): loại trừ header row nếu getByRole('row') trả về cả <thead>.
    return this.page.getByRole('row');
  }

  increaseQtyButton(productName: string): Locator {
    // TODO(verify): xác nhận accessible name thật của nút "+" (có thể là aria-label
    // "Tăng số lượng" thay vì ký tự "+"). Mở DevTools > Accessibility để kiểm tra.
    return this.row(productName).getByRole('button', { name: /^\+$|Tăng số lượng sản phẩm/i });
  }

  decreaseQtyButton(productName: string): Locator {
    // TODO(verify): tương tự nút tăng — xác nhận accessible name thật.
    return this.row(productName).getByRole('button', { name: /^-$|Giảm số lượng sản phẩm/i });
  }

  qtyValue(productName: string): Locator {
    // TODO(verify): nếu số lượng hiển thị trong <input>, dùng .inputValue();
    // nếu chỉ là text, dùng .textContent(). Hàm readQty() bên dưới đã xử lý cả 2 khả năng.
    return this.row(productName).locator('input, [data-qty], span').first();
  }

  lineTotal(productName: string): Locator {
    // TODO(verify): xác nhận đây đúng là ô "Thành tiền" của dòng, không phải "Đơn giá".
    return this.row(productName).getByText(/vn₫/);
  }

  /** README FR-07: nhãn CHÍNH XÁC phải là "Tổng cộng" (không phải "Tổng tạm tính"). */
  cartTotal(): Locator {
    return this.page.getByText('Tổng cộng');
  }

  deleteButton(productName: string): Locator {
    // README nêu rõ "Nút Xóa sản phẩm" — dùng đúng chữ "Xóa".
    return this.row(productName).getByRole('button', { name: /Xóa sản phẩm/i });
  }

  confirmDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  confirmDeleteButton(): Locator {
    // TODO(verify): README chỉ nói "phải có dialog xác nhận", không nêu chữ chính xác
    // trên nút. Xác nhận lại chữ thật (có thể là "Xác nhận", "Đồng ý", hoặc "Xóa").
    return this.confirmDialog().getByRole('button', { name: /Xác nhận|Đồng ý|Xóa/i });
  }

  cancelDeleteButton(): Locator {
    // TODO(verify): tương tự — xác nhận chữ thật trên nút hủy.
    return this.confirmDialog().getByRole('button', { name: /Hủy|Đóng/i });
  }

  /** README FR-07: nút quay về trang chủ. */
  continueShoppingButton(): Locator {
    return this.page.getByRole('button', { name: 'Tiếp tục' });
  }

  /** README FR-07 + FR-24: giỏ trống có hình minh họa + thông báo. */
  emptyStateMessage(): Locator {
    // TODO(verify): README không cho chữ chính xác, chỉ yêu cầu "thông báo rõ ràng".
    // Regex /trống/i là suy đoán hợp lý, xác nhận lại chữ thật trên UI.
    return this.page.getByText(/trống/i);
  }

  emptyStateIllustration(): Locator {
    // TODO(verify): xác nhận đây là <img> hay <svg>; điều chỉnh role tương ứng.
    return this.page.getByRole('svg').first();
  }

  /** Đọc số lượng hiện tại của một dòng, xử lý cả trường hợp <input> lẫn text thường. */
  async readQty(productName: string): Promise<number> {
    const locator = this.qtyValue(productName);
    const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
    const raw =
      tagName === 'input'
        ? await locator.inputValue()
        : (await locator.textContent()) ?? '';
    const qty = Number(raw.replace(/[^\d]/g, ''));
    if (Number.isNaN(qty)) {
      throw new Error(`[CartPage] Không đọc được số lượng từng sản phẩm "${productName}"`);
    }
    return qty;
  }

  /** Đọc thành tiền dạng số (loại bỏ ký hiệu ₫ và dấu phân cách hàng nghìn). */
  async readLineTotal(productName: string): Promise<number> {
    const text = (await this.lineTotal(productName).textContent()) ?? '';
    return Number(text.replace(/[^\d]/g, ''));
  }

  async readCartTotalText(): Promise<string> {
    return (await this.cartTotal().textContent()) ?? '';
  }
}
