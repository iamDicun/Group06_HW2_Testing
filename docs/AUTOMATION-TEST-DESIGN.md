# Automation Test Design — FR-04, FR-10, FR-19 (EShop SUT)

## 1. Phạm vi & nguồn spec
- **Nguồn spec**: Tài liệu SRS EShop (`application/README.md`) và mã nguồn hệ thống (`application/backend`, `application/frontend-web`, `application/frontend-admin`).
- **Phạm vi kiểm thử tự động**:
  1. **FR-04**: Quản lý hồ sơ cá nhân (`PROFILE` - Frontend Web `http://localhost:5173/profile`).
  2. **FR-10**: Trạng thái Đơn hàng - Order State Machine (`ORDER_STATE` - Admin Web `http://localhost:5174` & Frontend Web `http://localhost:5173`).
  3. **FR-19**: Quản lý Người dùng - Admin (`USER_MGMT` - Admin Web `http://localhost:5174`).
- **Ghi chú Task**: **Task 1 — Data-Driven Cross-Browser Automation Testing**.
- **Tester Attribution**: **`Run by: 23127391`** (visibly displayed in HTML report metadata, header, test annotations, and suite titles).

---

## 2. Framework & môi trường
- **Framework**: **Playwright** (TypeScript).
- **Trình duyệt mục tiêu**: **3 browsers** — `Chromium`, `Firefox`, `WebKit`.
- **Số lần chạy tối thiểu**: 3 features × 3 browsers = **9 browser runs** (tổng cộng 108+ test executions).
- **Base URLs**:
  - Customer Frontend Web: `http://localhost:5173`
  - Admin Frontend Web: `http://localhost:5174`
  - Backend API: `http://localhost:3000`
- **Định dạng data**: **JSON** (`data/fr04-profile-data.json`, `data/fr10-order-state-data.json`, `data/fr19-user-mgmt-data.json`) — hỗ trợ cấu trúc phân cấp, mảng trạng thái, và zero-hardcoding trong file `.spec.ts`.
- **Báo cáo kết quả**: Playwright HTML Reporter hiển thị trực quan thông tin **`Run by: 23127391`**.

---

## 3. Danh sách Scenario

### 3.1. Feature FR-04: Personal Profile Management (`tests/fr04-profile.spec.ts`)
| Scenario ID | Mô tả | Loại (Positive/Negative/Boundary/Security) | Tham chiếu Spec |
|---|---|---|---|
| `SC-FR04-001` | Cập nhật hồ sơ với họ tên hợp lệ, SĐT 10 chữ số bắt đầu bằng 0, địa chỉ hợp lệ | Positive | FR-04 |
| `SC-FR04-002` | Cập nhật hồ sơ với SĐT 11 chữ số bắt đầu bằng 0 | Positive / Boundary | FR-04 |
| `SC-FR04-003` | Cập nhật họ tên có dấu tiếng Việt Unicode đầy đủ | Positive | FR-04 |
| `SC-FR04-004` | Cập nhật địa chỉ giao hàng nhiều dòng có ký tự đặc biệt | Positive | FR-04 |
| `SC-FR04-005` | Nhập số điện thoại chứa ký tự chữ cái -> Báo lỗi validation | Negative | FR-04 |
| `SC-FR04-006` | Nhập số điện thoại dưới 10 chữ số (9 chữ số) -> Báo lỗi validation | Boundary / Negative | FR-04 |
| `SC-FR04-007` | Nhập số điện thoại trên 11 chữ số (12 chữ số) -> Báo lỗi validation | Boundary / Negative | FR-04 |
| `SC-FR04-008` | Nhập số điện thoại không bắt đầu bằng số 0 (VD: 1912345678) -> Báo lỗi | Negative | FR-04 |
| `SC-FR04-009` | Bỏ trống ô Họ Tên -> HTML5 / Form validation ngăn submit | Negative | FR-04 |
| `SC-FR04-010` | Trường Email bị vô hiệu hóa (disabled / readonly), không cho phép sửa | Security / Spec rule | FR-04 |
| `SC-FR04-011` | Người dùng thường không thể tự nâng quyền thành role admin qua form | Security / Access control | FR-04 |
| `SC-FR04-012` | Chưa đăng nhập truy cập `/profile` -> Hiển thị thông báo yêu cầu đăng nhập | Access Control | FR-04 |
| `SC-FR04-013` | Nhập chuỗi XSS payload trong địa chỉ -> Xử lý an toàn dưới dạng text | Security / Edge | FR-04, FR-21 |

### 3.2. Feature FR-10: Order State Machine (`tests/fr10-order-state.spec.ts`)
| Scenario ID | Mô tả | Loại (Positive/Negative/Boundary/Security) | Tham chiếu Spec |
|---|---|---|---|
| `SC-FR10-001` | Admin chuyển trạng thái đơn hàng: `pending` -> `confirmed` | Positive | FR-10, FR-18 |
| `SC-FR10-002` | Admin chuyển trạng thái đơn hàng: `confirmed` -> `shipping` | Positive | FR-10, FR-18 |
| `SC-FR10-003` | Admin chuyển trạng thái đơn hàng: `shipping` -> `delivered` | Positive | FR-10, FR-18 |
| `SC-FR10-004` | Admin chuyển trạng thái đơn hàng: `pending` -> `canceled` | Positive | FR-10, FR-18 |
| `SC-FR10-005` | Admin chuyển trạng thái đơn hàng: `confirmed` -> `canceled` | Positive | FR-10, FR-18 |
| `SC-FR10-006` | Khách hàng tự hủy đơn hàng đang ở trạng thái `pending` trên trang cá nhân | Positive | FR-10, FR-20 |
| `SC-FR10-007` | Khách hàng tự hủy đơn hàng đang ở trạng thái `confirmed` trên trang cá nhân | Positive | FR-10, FR-20 |
| `SC-FR10-008` | Đơn hàng ở trạng thái `shipping` không cho phép khách hàng tự hủy | Security / Spec rule | FR-10 |
| `SC-FR10-009` | Trạng thái `delivered` là trạng thái kết thúc (Final State) — không có nút chuyển tiếp | Spec rule / Negative | FR-10 |
| `SC-FR10-010` | Trạng thái `canceled` là trạng thái kết thúc (Final State) — không cho phép đổi trạng thái | Spec rule / Negative | FR-10 |
| `SC-FR10-011` | Chuyển đổi nhảy cóc không hợp lệ (`pending` -> `delivered`) bị backend từ chối | Negative / API check | FR-10 |
| `SC-FR10-012` | Chuyển đổi ngược không hợp lệ (`shipping` -> `pending`) bị backend từ chối | Negative / API check | FR-10 |
| `SC-FR10-013` | Kiểm tra hiển thị nhãn tiếng Việt & màu sắc badge cho cả 5 trạng thái đơn hàng | UI / Localization | FR-10, FR-11 |

### 3.3. Feature FR-19: User Management Admin (`tests/fr19-user-mgmt.spec.ts`)
| Scenario ID | Mô tả | Loại (Positive/Negative/Boundary/Security) | Tham chiếu Spec |
|---|---|---|---|
| `SC-FR19-001` | Admin xem đầy đủ danh sách người dùng với các cột ID, Email, Role, Số ĐT | Positive | FR-19 |
| `SC-FR19-002` | Mật khẩu / Hash mật khẩu không bao giờ bị lộ trên giao diện quản lý người dùng | Security | FR-19 |
| `SC-FR19-003` | Admin xóa tài khoản người dùng thông thường (`role = 'user'`) | Positive | FR-19 |
| `SC-FR19-004` | Ràng buộc bảo vệ: Admin không được xóa chính tài khoản đang đăng nhập | Spec rule / Safety | FR-19 |
| `SC-FR19-005` | Tài khoản thường (non-admin) đăng nhập vào Admin Web bị từ chối truy cập | Access Control | FR-12, FR-19 |
| `SC-FR19-006` | Chưa đăng nhập truy cập Admin Web bị chuyển hướng / yêu cầu đăng nhập | Access Control | FR-12, FR-19 |
| `SC-FR19-007` | Danh sách người dùng tự động cập nhật và giảm số lượng sau khi xóa | Positive | FR-19 |
| `SC-FR19-008` | Người dùng đã bị Admin xóa không thể đăng nhập vào hệ thống khách hàng | Integration / LifeCycle | FR-02, FR-19 |
| `SC-FR19-009` | Role hiển thị phân biệt rõ ràng giữa `admin` và `user` | Positive / UI | FR-19 |
| `SC-FR19-010` | Số điện thoại cập nhật từ Profile phản ánh chính xác trong bảng Admin User | Integration | FR-04, FR-19 |
| `SC-FR19-011` | API `/api/admin/users` từ chối request không có JWT token hoặc token giả mạo | Security / API check | FR-12, FR-19 |
| `SC-FR19-012` | Đăng ký tài khoản mới rồi xóa qua Admin Web thành công | End-to-End Lifecycle | FR-01, FR-19 |
| `SC-FR19-013` | Cấu trúc tiêu đề bảng và các phần tử UI của trang Quản lý Người dùng đầy đủ | UI / DOM structure | FR-19 |

---

## 4. Data Schema

### 4.1. FR-04 Profile Test Data Schema (`data/fr04-profile-data.json`)
| Field | Kiểu dữ liệu | Bắt buộc | Vai trò | Mô tả |
|---|---|---|---|---|
| `scenarioId` | String | Có | Metadata | Mã định danh scenario (`SC-FR04-001`...) |
| `description` | String | Có | Metadata | Mô tả mục đích kiểm thử |
| `testType` | String | Có | Metadata | Loại test: `positive`, `negative`, `boundary`, `security` |
| `loginEmail` | String | Có | Input | Email đăng nhập của tài khoản test |
| `loginPassword` | String | Có | Input | Mật khẩu tài khoản test |
| `inputName` | String | Có | Input | Giá trị nhập vào ô Họ Tên |
| `inputPhone` | String | Có | Input | Giá trị nhập vào ô Số điện thoại |
| `inputAddress` | String | Có | Input | Giá trị nhập vào ô Địa chỉ giao hàng |
| `expectedResult` | String | Có | Expected | `success`, `validation_error`, `unauthorized`, `readonly` |
| `expectedAlertMessage`| String | Không | Expected | Thông báo mong đợi trên Alert/Toast dialog |
| `expectedPhoneInDb` | String | Không | Expected | Số điện thoại lưu lại sau cập nhật |

### 4.2. FR-10 Order State Test Data Schema (`data/fr10-order-state-data.json`)
| Field | Kiểu dữ liệu | Bắt buộc | Vai trò | Mô tả |
|---|---|---|---|---|
| `scenarioId` | String | Có | Metadata | Mã định danh scenario (`SC-FR10-001`...) |
| `description` | String | Có | Metadata | Mô tả mục đích kiểm thử |
| `testType` | String | Có | Metadata | Loại test: `positive`, `negative`, `boundary`, `security` |
| `actor` | String | Có | Context | `admin` hoặc `customer` |
| `initialStatus` | String | Có | Context | Trạng thái ban đầu của đơn hàng (`pending`, `confirmed`...) |
| `targetAction` | String | Có | Input | Tên nút bấm thao tác ("Xác nhận", "Giao hàng", "Hủy", etc.) |
| `expectedNextStatus` | String | Có | Expected | Trạng thái mong đợi sau thao tác (`confirmed`, `shipping`...) |
| `expectedStatusLabel`| String | Có | Expected | Nhãn hiển thị tiếng Việt tương ứng |
| `isAllowed` | Boolean | Có | Expected | Thao tác có được phép hay không |
| `expectedError` | String | Không | Expected | Lỗi mong đợi nếu là chuyển đổi không hợp lệ |

### 4.3. FR-19 User Management Test Data Schema (`data/fr19-user-mgmt-data.json`)
| Field | Kiểu dữ liệu | Bắt buộc | Vai trò | Mô tả |
|---|---|---|---|---|
| `scenarioId` | String | Có | Metadata | Mã định danh scenario (`SC-FR19-001`...) |
| `description` | String | Có | Metadata | Mô tả mục đích kiểm thử |
| `testType` | String | Có | Metadata | Loại test: `positive`, `negative`, `boundary`, `security` |
| `loginEmail` | String | Có | Input | Email admin hoặc user thử nghiệm |
| `loginPassword` | String | Có | Input | Mật khẩu tài khoản |
| `targetUserEmail` | String | Không | Input | Email của user mục tiêu thực hiện thao tác xóa |
| `action` | String | Có | Input | Thao tác cần thực hiện (`view_list`, `delete_user`, `delete_self`...) |
| `expectedResult` | String | Có | Expected | `success`, `access_denied`, `protected` |
| `expectedUserPresent`| Boolean | Không | Expected | User mục tiêu còn xuất hiện trong bảng hay không |

---

## 5. Selector Strategy
Tuân thủ thứ tự ưu tiên giảm thiểu tính flaky:
1. `getByRole('button', { name: ... })`, `getByRole('table')`, `getByRole('row')`
2. `getByLabel('Họ Tên')`, `getByLabel('Số điện thoại')`, `getByLabel('Địa chỉ giao hàng')`
3. `getByPlaceholder(...)` cho các ô input đặc thù
4. `getByText(...)` cho các nhãn và badge trạng thái
5. CSS selector semantic / data attributes khi cần định vị chính xác theo row ID

---

## 6. Cấu trúc Project
```
Group06_HW2_Testing/
├── package.json
├── playwright.config.ts
├── pages/
│   ├── AuthHelper.ts
│   ├── ProfilePage.ts
│   ├── AdminOrdersPage.ts
│   └── AdminUsersPage.ts
├── data/
│   ├── fr04-profile-data.json
│   ├── fr10-order-state-data.json
│   └── fr19-user-mgmt-data.json
├── tests/
│   ├── fr04-profile.spec.ts
│   ├── fr10-order-state.spec.ts
│   └── fr19-user-mgmt.spec.ts
├── reporters/
│   └── custom-header-reporter.ts
├── docs/
│   └── AUTOMATION-TEST-DESIGN.md
└── submission/
    └── report.md
```

---

## 7. Giả định / Cần làm rõ
- Backend database được reset và khởi tạo với seed data chuẩn (`node database.js`) trước khi chạy test suite.
- Tài khoản Admin mặc định: `admin@eshop.com` / `Admin123!` (hoặc `admin123`).
- Tài khoản User mặc định: `test@eshop.com` / `Test1234!`.
- Báo cáo HTML tự động nhúng header và metadata **`Run by: 23127391`**.
