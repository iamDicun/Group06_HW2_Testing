/**
 * MSSV cua sinh vien - duoc nhung vao tieu de bao cao HTML.
 */
export const MSSV = "23127459";

/**
 * Cau hinh moi truong (co the ghi de bang bien moi truong).
 *
 * Luu y: Frontend (web/admin) goi API den host remote
 * `eshop-sut-clone-ktpm.onrender.com`; interceptor apiRewrite se chuyen
 * cac request do ve backend local de phuc vu kiem thu.
 */
export const ENV = {
  WEB_BASE_URL: process.env.WEB_BASE_URL || "http://localhost:5173",
  ADMIN_BASE_URL: process.env.ADMIN_BASE_URL || "http://localhost:5174",
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000",
  API_ORIGINAL_HOST: "https://eshop-sut-clone-ktpm.onrender.com",
};
