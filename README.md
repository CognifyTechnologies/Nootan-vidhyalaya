# શ્રી નૂતન વિદ્યાલય કરણનગર (Nootan Vidhyalaya Karannagar)
> **॥ કર ભલા હોગા ભલા ॥ (Kar Bhala Hoga Bhala)**  
> કરણનગર, તા. કડી, જી. મહેસાણા, ઉત્તર ગુજરાત - 382715

સંપૂર્ણ દ્વિભાષી (ગુજરાતી / English) સત્તાવાર શાળા વેબસાઇટ અને ઓનલાઇન પ્રવેશ પ્રણાલી (Online Admission System).

---

## 🚀 GitHub પર Push કેવી રીતે કરવું (Git Push Guide)

તમારા પ્રોજેક્ટમાં `.gitignore` સંપૂર્ણપણે સેટ કરી દેવામાં આવ્યું છે. (કોઈપણ વધારાની ફાઇલો જેવી કે `node_modules`, `.env`, કે `dist` ક્યારેય પુશ થશે નહીં).

ટર્મિનલમાં નીચે મુજબ કમાન્ડ ચલાવીને ગિટહબ પર પુશ કરો:

```bash
# 1. તમામ ફાઈલો સ્ટેજ કરો
git add .

# 2. કમિટ કરો
git commit -m "Complete Nootan Vidhyalaya School Website & Vercel Ready"

# 3. જો મેઈન બ્રાન્ચ સેટ ન હોય
git branch -M main

# 4. તમારા GitHub રિપોઝીટરી સાથે જોડો (તમારી URL વાપરો)
git remote add origin https://github.com/YOUR_USERNAME/nootan-vidhyalaya.git

# 5. પુશ કરો
git push -u origin main
```

---

## ⚡ Vercel પર Deployment અને .in Domain કનેક્ટ કરવાની રીત

પ્રોજેક્ટમાં **`vercel.json`** પહેલેથી જ ગોઠવી દેવાયું છે, જેથી Vercel પર માત્ર ૧-ક્લિકમાં ડિપ્લોય થઈ જશે:

### પગલું ૧: Vercel પર ડિપ્લોય કરો
1. [vercel.com](https://vercel.com) પર લોગિન કરો.
2. **"Add New Project"** પર ક્લિક કરો અને તમારું GitHub રિપોઝીટરી પસંદ કરો.
3. Vercel આપોઆપ સેટિંગ્સ પકડી લેશે:
   - **Framework Preset:** Angular
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/nootan-vidhyalaya/browser`
4. **"Deploy"** બટન પર ક્લિક કરો. ૨ મિનિટમાં સાઇટ લાઈવ થઈ જશે!

### પગલું ૨: તમારું `.in` ડોમેન જોડો (Custom Domain Setup)
1. Vercel ડેશબોર્ડમાં તમારા પ્રોજેક્ટ પર જાઓ -> **Settings** -> **Domains**.
2. તમારું ડોમેન (દા.ત. `nootanvidhyalaya.in` અથવા `www.nootanvidhyalaya.in`) લખીને **"Add"** પર ક્લિક કરો.
3. Vercel તમને ૨ DNS રેકોર્ડ આપશે (જેવા કે A Record `76.76.21.21` અથવા CNAME).
4. તમારા ડોમેન પ્રોવાઈડર (GoDaddy / Hostinger / Namecheap જ્યાંથી તમે `.in` ડોમેન લીધું હોય) માં DNS મેનેજમેન્ટમાં જઈને આ રેકોર્ડ ઉમેરી દો.
5. ૧૦ થી ૧૫ મિનિટમાં તમારી સાઇટ આપના `.in` ડોમેન પર સુરક્ષિત SSL (HTTPS) સાથે લાઈવ થઈ જશે!

---

## 📧 ઓનલાઇન પ્રવેશ ઈમેલ ડિસ્પેચ (`dilippatel1979@gmail.com`)

- જ્યારે પણ કોઈ વિદ્યાર્થી વેબસાઇટ પરથી ઓનલાઇન પ્રવેશ ફોર્મ સબમિટ કરશે, ત્યારે તેની તમામ માહિતી આપોઆપ **`dilippatel1979@gmail.com`** પર મોકલાઈ જશે.
- વેબસાઇટના પબ્લિક UI પર ક્યાંય પણ ઈમેલ કે ફોન નંબર દેખાશે નહીં.
- વાલી તરત જ સત્તાવાર પ્રવેશ પહોંચ (Admission Slip) ડાઉનલોડ અથવા પ્રિન્ટ કરી શકશે.
- શાળા સંચાલકો માટે હેડર/ફૂટરમાં **"અરજી રજિસ્ટર"** પોર્ટલ ઉપલબ્ધ છે જ્યાંથી તમામ અરજીઓ જોઈ શકાય છે અને Excel/CSV માં એક્સપોર્ટ કરી શકાય છે.

---

## 📁 મુખ્ય ફાઇલો અને કન્ફિગરેશન
- `vercel.json` : Vercel SPA routing અને API rewrites.
- `.gitignore`  : સુરક્ષિત કન્ફિગરેશન (node_modules, credentials & build files ignored).
- `api/admission.js` : Vercel Serverless Function.
- `server/index.js`  : લોકલ ડેવલપમેન્ટ માટે Node.js Express સર્વર.
- `src/` : એંગ્યુલર દ્વિભાષી સોર્સ કોડ.
