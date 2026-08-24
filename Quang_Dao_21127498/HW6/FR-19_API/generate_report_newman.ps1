# Kích hoạt chạy Newman và xuất Báo cáo HTML
newman run collections/EShop_Admin_Users.postman_collection.json `
  -e environments/EShop_Local.postman_environment.json `
  -d data/data_fr19.json `
  -r "cli,htmlextra" `
  --reporter-htmlextra-export reports/EShop_FR19_Report.html `
  --reporter-htmlextra-title "EShop API Test Report - FR-19 Admin Users"