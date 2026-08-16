# AI Audit Report

**Student:** 23127459 - Huynh Vuong Thuy Quan

---

## Tong quan su dung AI

Trong qua trinh lam bai tap HW05 - Performance Testing, toi da su dung AI (opencode/mimo-v2.5-free) de ho tro cac cong viec:
- Quet ma nguon EShop de lay API endpoints
- Tao file JMeter JMX cho 3 scenario (Load, Stress, Spike)
- Tao file CSV input data
- Tao workflow GitHub Actions CI/CD
- Viet bao cao README.md va AI Critique

---

## Nhat ky hop tac voi AI (Audit Log)

| # | AI Tool | Thoi gian | Prompt | Danh gia |
|---|---------|-----------|--------|----------|
| 1 | opencode | 16/08/2026 14:00 | "Quet ma nguon EShop tai D:\DATA_D\ProjectGitHub\eshop-sut\ de lay API endpoints, HTTP methods, headers, payload structure" | AI tra ve danh sach 31 API endpoints chinh xac, bao gom login, products, cart, checkout. Rat huu ich. |
| 2 | opencode | 16/08/2026 14:30 | "Thiet ke 3 ky ban kiem thu (Load/Stress/Spike) voi thong so VUs, ramp-up, think-time phu hop voi EShop" | AI de xuat 3 scenario hop ly: Load (50 VUs), Stress (100 VUs), Spike (200 VUs). Co phan tich chi tiet. |
| 3 | opencode | 16/08/2026 15:00 | "Tao 3 file JMX JMeter cho Load Test, Stress Test, Spike Test" | AI tao file JMX nhung bi loi: URL duplication (http://http://...), cross-thread token scope. Can fix sau. |
| 4 | opencode | 16/08/2026 15:30 | "Tao file CSV input data cho 3 scenario" | AI tao dung 3 file CSV voi du lieu mau phu hop voi database schema EShop. |
| 5 | opencode | 16/08/2026 16:00 | "Sua loi URL duplication trong JMX files" | AI sua thanh cong, loai bo prefix http:// trung lap. |
| 6 | opencode | 16/08/2026 16:30 | "Sua loi cross-thread auth token scope trong Spike Test" | AI sua bang cach them Setup Thread Group de login lay token truoc. |
| 7 | opencode | 16/08/2026 17:00 | "Tao workflow GitHub Actions CI/CD cho performance testing" | AI tao file YAML ho chinh, nhung can sua lai trigger va cac step cho phu hop. |
| 8 | opencode | 16/08/2026 18:00 | "Viet bao cao README.md voi du lieu that tu reports" | AI doc statistics.json va viet bao cao chi tiet, dung du lieu thuc te. |
| 9 | opencode | 16/08/2026 19:00 | "Viet AI Critique phan tich loi AI da mac phai" | AI viet chi tiet 3 loi chinh va bai hoc hoc tap. Rat can than. |
| 10 | opencode | 16/08/2026 20:00 | "Sua workflow CI/CD theo yeu cau moi" | AI sua lai trigger on push, them Spike Test, xoa step analyze_results.py. |
| 11 | opencode | 16/08/2026 21:00 | "Tao bug-report.md va ai_audit.md" | AI tao 2 file theo mau template. |

---

## Danh gia ket qua AI

### Da ap dung thanh cong:
- Quet ma nguon EShop de lay API endpoints
- Tao file CSV input data
- Viet bao cao README.md voi du lieu that
- Viet AI Critique phan tich loi
- Tao git log

### Can sua loi:
- File JMX bi loi URL duplication → da fix
- File JMX bi loi cross-thread token scope → da fix
- Workflow CI/CD can sua lai nhieu step → da fix

### Khong ap dung:
- Script analyze_results.py (khong can thiet cho bai nop)

---

## Bai hoc hoc tap

1. **Trust but Verify:** Luon validate output cua AI truoc khi su dung
2. **Debug by logs:** Doc JTL log de hieu root cause, khong chi nhin pass/fail
3. **AI la tool:** AI giup generate code nhanh, nhung responsibility thuoc ve nguoi dung
4. **Iterative refinement:** Lan dau AI tao code thuong co bugs, can quy trinh Generate → Test → Debug → Fix
