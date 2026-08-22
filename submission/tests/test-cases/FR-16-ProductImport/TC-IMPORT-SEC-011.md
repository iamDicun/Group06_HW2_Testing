# TC-IMPORT-SEC-011: DoS / Bulk Payload Exhaustion - Gửi mảng 10,000 items

**Kỹ thuật thiết kế**: Security Testing (SEC-06)
**Tham chiếu test condition**: SEC-06-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: DoS / Bulk Payload Exhaustion - Gửi mảng 10,000 items

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{admin_token}}`
- **Body (JSON)**:
```json
{
  "products": [
    {
      "name": "Bulk SP 0",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 1",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 2",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 3",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 4",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 5",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 6",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 7",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 8",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 9",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 10",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 11",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 12",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 13",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 14",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 15",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 16",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 17",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 18",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 19",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 20",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 21",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 22",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 23",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 24",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 25",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 26",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 27",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 28",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 29",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 30",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 31",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 32",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 33",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 34",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 35",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 36",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 37",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 38",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 39",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 40",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 41",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 42",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 43",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 44",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 45",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 46",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 47",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 48",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 49",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 50",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 51",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 52",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 53",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 54",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 55",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 56",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 57",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 58",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 59",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 60",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 61",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 62",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 63",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 64",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 65",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 66",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 67",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 68",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 69",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 70",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 71",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 72",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 73",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 74",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 75",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 76",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 77",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 78",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 79",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 80",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 81",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 82",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 83",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 84",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 85",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 86",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 87",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 88",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 89",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 90",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 91",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 92",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 93",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 94",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 95",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 96",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 97",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 98",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 99",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 100",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 101",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 102",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 103",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 104",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 105",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 106",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 107",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 108",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 109",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 110",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 111",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 112",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 113",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 114",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 115",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 116",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 117",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 118",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 119",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 120",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 121",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 122",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 123",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 124",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 125",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 126",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 127",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 128",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 129",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 130",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 131",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 132",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 133",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 134",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 135",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 136",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 137",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 138",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 139",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 140",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 141",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 142",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 143",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 144",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 145",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 146",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 147",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 148",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 149",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 150",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 151",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 152",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 153",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 154",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 155",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 156",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 157",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 158",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 159",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 160",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 161",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 162",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 163",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 164",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 165",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 166",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 167",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 168",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 169",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 170",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 171",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 172",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 173",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 174",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 175",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 176",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 177",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 178",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 179",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 180",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 181",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 182",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 183",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 184",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 185",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 186",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 187",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 188",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 189",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 190",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 191",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 192",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 193",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 194",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 195",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 196",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 197",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 198",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 199",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 200",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 201",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 202",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 203",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 204",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 205",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 206",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 207",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 208",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 209",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 210",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 211",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 212",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 213",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 214",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 215",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 216",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 217",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 218",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 219",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 220",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 221",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 222",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 223",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 224",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 225",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 226",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 227",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 228",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 229",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 230",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 231",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 232",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 233",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 234",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 235",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 236",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 237",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 238",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 239",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 240",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 241",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 242",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 243",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 244",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 245",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 246",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 247",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 248",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 249",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 250",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 251",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 252",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 253",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 254",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 255",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 256",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 257",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 258",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 259",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 260",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 261",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 262",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 263",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 264",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 265",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 266",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 267",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 268",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 269",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 270",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 271",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 272",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 273",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 274",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 275",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 276",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 277",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 278",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 279",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 280",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 281",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 282",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 283",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 284",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 285",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 286",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 287",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 288",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 289",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 290",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 291",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 292",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 293",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 294",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 295",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 296",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 297",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 298",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 299",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 300",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 301",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 302",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 303",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 304",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 305",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 306",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 307",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 308",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 309",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 310",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 311",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 312",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 313",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 314",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 315",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 316",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 317",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 318",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 319",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 320",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 321",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 322",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 323",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 324",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 325",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 326",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 327",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 328",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 329",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 330",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 331",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 332",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 333",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 334",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 335",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 336",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 337",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 338",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 339",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 340",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 341",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 342",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 343",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 344",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 345",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 346",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 347",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 348",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 349",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 350",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 351",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 352",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 353",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 354",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 355",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 356",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 357",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 358",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 359",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 360",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 361",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 362",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 363",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 364",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 365",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 366",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 367",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 368",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 369",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 370",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 371",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 372",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 373",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 374",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 375",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 376",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 377",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 378",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 379",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 380",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 381",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 382",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 383",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 384",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 385",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 386",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 387",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 388",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 389",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 390",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 391",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 392",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 393",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 394",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 395",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 396",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 397",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 398",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 399",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 400",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 401",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 402",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 403",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 404",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 405",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 406",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 407",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 408",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 409",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 410",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 411",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 412",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 413",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 414",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 415",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 416",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 417",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 418",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 419",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 420",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 421",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 422",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 423",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 424",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 425",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 426",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 427",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 428",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 429",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 430",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 431",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 432",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 433",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 434",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 435",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 436",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 437",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 438",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 439",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 440",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 441",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 442",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 443",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 444",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 445",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 446",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 447",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 448",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 449",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 450",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 451",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 452",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 453",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 454",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 455",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 456",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 457",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 458",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 459",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 460",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 461",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 462",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 463",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 464",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 465",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 466",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 467",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 468",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 469",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 470",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 471",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 472",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 473",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 474",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 475",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 476",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 477",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 478",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 479",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 480",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 481",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 482",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 483",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 484",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 485",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 486",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 487",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 488",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 489",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 490",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 491",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 492",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 493",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 494",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 495",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 496",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 497",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 498",
      "price": 10000,
      "category_id": 1
    },
    {
      "name": "Bulk SP 499",
      "price": 10000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `413/400/200`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Server kiểm soát kích thước payload hoặc từ chối an toàn, không tràn bộ nhớ
- **Xử lý An ninh/Bảo mật**: Server kiểm soát kích thước payload hoặc từ chối an toàn, không tràn bộ nhớ

## Ưu tiên
High
