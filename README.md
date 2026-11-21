# Python kursi (özbekça)

Boşlovçilar uçun interaktiv Python kursi — butunlay özbek tilida (yangi lotin alifbosi: Ğ ğ, Ö ö, Ş ş, Ç ç).
Kurs brauzerda işlaydi: Python kodi sahifaning özida (Pyodide orqali) bajariladi, server kerak emas.

Bu loyiha [futurecoder](https://github.com/alexmojaki/futurecoder) (muallif: Alex Hall, MIT litsenziyasi) asosida yaratilgan.
Asl inglizça tavsif: [README.en.md](README.en.md). Litsenziya: [LICENSE.txt](LICENSE.txt).

## Imkoniyatlar

- 12 bob: konsol, satrlar, özgaruvçilar, sikllar, şartlar, röyxatlar, funksiyalar, luğatlar, krestik-nolik loyihasi.
- Python xatolarining özbekça tuşuntirişlari.
- Şaxsiy kiriş (login/parol), qoronği rejim, telefon/planşet/kompyuterga moslaşuvçan dizayn.
- Yutuqlar brauzerning özida saqlanadi (Firebase yoki boşqa server kerak emas).

## Kiriş (login)

Sayt faqat bitta foydalanuvçi uçun yopiq:

- Login: `user`
- Parol: `123`

Ularni özgartiriş uçun [frontend/src/languages.js](frontend/src/languages.js) faylidagi `uz` bölimida `privateLogin` ni tahrirlang.
Bu oddiy brauzer qulfi: sahifa fayllari baribir yuklab olinişi mumkin, şuning uçun maxfiy maʼlumotlarni bu saytga qöymang.

## Bulutga joylaş (Vercel)

Har safar `main` tarmoğiga push qilinganda GitHub Actions ([.github/workflows/workflow.yml](.github/workflows/workflow.yml)):

1. inglizça va özbekça kursning barça qadamlarini tekşiradi,
2. saytni yiğadi,
3. tayyor fayllarni `deploy` tarmoğiga joylaydi.

Vercel'da bir marta sozlaş:

1. vercel.com → **Add New → Project** → GitHub'dagi `python_kurs1` reposini tanlang.
2. **Framework Preset**: `Other`. **Build Command** va **Install Command**: böş (Override → böş qoldiring). **Output Directory**: `.`
3. Deploy qiling. Keyin **Settings → Git → Production Branch** ni `deploy` ga özgartiring va qayta deploy qiling.

Şundan keyin har bir push avtomatik ravişda saytni yangilaydi. Xuddi şu `deploy` tarmoğini Netlify yoki Cloudflare Pages'ga ham ulaş mumkin (build buyruği kerak emas).

## Lokal ravişda yiğiş

Python 3.12 va Node 22 kerak.

```bash
./scripts/install_deps.sh
FUTURECODER_LANGUAGE=uz ./scripts/build.sh   # natija: dist/ papkasi
cd dist && python -m http.server 8000         # http://localhost:8000/course/
```

Tarjimalar: [translations/locales/uz](translations/locales/uz) (kurs matni, interfeys, xato tuşuntirişlari, bosh sahifa).
