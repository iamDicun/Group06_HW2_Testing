# Kích hoạt chạy Newman và xuất Báo cáo HTML
newman run collections/EShop_Cart.postman_collection.json `
  -e environments/EShop_Local.postman_environment.json `
  -d data/data_fr07.json `
  -r "cli,htmlextra" `
  --reporter-htmlextra-export reports/EShop_FR07_Report.html `
  --reporter-htmlextra-title "EShop API Test Report - FR-07 Cart"