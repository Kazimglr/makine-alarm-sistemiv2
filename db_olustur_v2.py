import json

arizali_makineler = [
    {
        "id": 1,
        "name": "Pres Makinesi 01",
        "faultReason": "Aşırı Isınma",
        "faultDetail": "Sıcaklık sınırı aşıldı.",
        "faultTime": "2025-07-11T12:11:00"
    },
    {
        "id": 2,
        "name": "Frez Makinesi 02",
        "faultReason": "Düşük Yağ Basıncı",
        "faultDetail": "Yağ basıncı kritik seviyesinin altına düştü.",
        "faultTime": "2025-07-11T12:05:00"
    },
    {
        "id": 3,
        "name": "Hidrolik Pres 03",
        "faultReason": "Titreşim Limiti",
        "faultDetail": "Titreşim seviyesi çok yüksek.",
        "faultTime": "2025-07-11T11:55:00"
    },
    {
        "id": 4,
        "name": "CNC Tezgah 04",
        "faultReason": "Sensör Arızası",
        "faultDetail": "Konum sensörü arızalı.",
        "faultTime": "2025-07-11T11:52:00"
    },
    {
        "id": 5,
        "name": "MTB45",
        "faultReason": "Acil Stop Aktif",
        "faultDetail": "Acil stop butonuna basıldı.",
        "faultTime": "2025-07-11T11:50:00"
    },
    {
        "id": 6,
        "name": "RTB-007",
        "faultReason": "Düşük Hava Basıncı",
        "faultDetail": "Pnömatik hava basıncı çok düşük.",
        "faultTime": "2025-07-11T11:45:00"
    }
]

# 7'den 120'ye kadar random çalışan makine
makine_listesi = []
for i in range(7, 121):
    makine = {
        "id": i,
        "name": f"MTB-{i:03d}",
        "faultReason": "",
        "faultDetail": "",
        "faultTime": ""
    }
    makine_listesi.append(makine)

alarms = arizali_makineler + makine_listesi

with open("db.json", "w", encoding="utf-8") as f:
    json.dump({"alarms": alarms}, f, ensure_ascii=False, indent=2)
