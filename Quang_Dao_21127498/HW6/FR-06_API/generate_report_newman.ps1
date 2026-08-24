# Kích hoạt chạy Newman và xuất Báo cáo HTML
newman run collections/EShop_Products.postman_collection.json `
  -e environments/EShop_Local.postman_environment.json `
  -d data/data_fr06.json `
  -r "cli,htmlextra" `
  --reporter-htmlextra-export reports/EShop_FR06_Report.html `
  --reporter-htmlextra-title "EShop API Test Report - FR-06 Products"