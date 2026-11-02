import { Injectable, signal, computed } from '@angular/core';

export type Language = 'gu' | 'en';

export const TRANSLATIONS = {
  gu: {
    topbar: {
      address: 'કરણનગર, તા. કડી, જી. મહેસાણા, ઉત્તર ગુજરાત - ૩૮૨૭૧૫',
      trust: 'શ્રી કરણનગર કેળવણી મંડળ સંચાલિત',
      affiliation: 'GSEB માન્યતા પ્રાપ્ત | રજિ. નં: ૨૫/ગુજ/૧૯૮૨',
      admissionOpen: 'શૈક્ષણિક વર્ષ ૨૦૨૬-૨૭ પ્રવેશ શરૂ!'
    },
    nav: {
      brandTitle: 'નૂતન વિદ્યાલય કરણનગર',
      brandSubtitle: '॥ કર ભલા હોગા ભલા ॥',
      home: 'મુખ્ય પૃષ્ઠ',
      about: 'શાળા પરિચય',
      academics: 'શિક્ષણ',
      activities: 'પ્રવૃત્તિઓ',
      celebrations: 'રાષ્ટ્રીય પર્વો',
      gallery: 'ગેલેરી',
      notices: 'સૂચનાઓ',
      admission: 'ઓનલાઇન પ્રવેશ',
      contact: 'સંપર્ક',
      adminPortal: 'અરજી રજિસ્ટર'
    },
    hero: {
      badge: 'શ્રેષ્ઠતા તરફ અગ્રેસર • સ્થાપિત વારસો',
      title: 'સંસ્કાર, શિક્ષણ અને સમર્પણનું પવિત્ર ધામ',
      subtitle: 'શ્રી નૂતન વિદ્યાલય, કરણનગર - જ્યાં વિદ્યાર્થીઓને જ્ઞાન સાથે સંસ્કાર, શિસ્ત, રમત-ગમત અને રાષ્ટ્રભાવનાનું ઉત્તમ શિક્ષણ આપવામાં આવે છે.',
      ctaAdmission: 'ઓનલાઇન પ્રવેશ ફોર્મ ભરો',
      ctaExplore: 'શાળા પરિચય જુઓ',
      ctaCall: 'સંપર્ક કરો',
      statYears: '૩૫+ વર્ષ',
      statYearsDesc: 'શૈક્ષણિક ગૌરવપૂર્ણ પરંપરા',
      statStudents: '૧૨૦૦+',
      statStudentsDesc: 'તેજસ્વી વિદ્યાર્થીઓ',
      statResults: '૧૦૦%',
      statResultsDesc: 'બોર્ડ પરીક્ષાનું શ્રેષ્ઠ પરિણામ',
      statFaculty: '૪૦+',
      statFacultyDesc: 'અનુભવી & સમર્પિત શિક્ષકો'
    },
    ticker: {
      label: 'તાજા સમાચાર',
      items: [
        'શૈક્ષણિક વર્ષ ૨૦૨૬-૨૦૨૭ માટે તમામ ધોરણોમાં ઓનલાઇન પ્રવેશ પ્રક્રિયા શરૂ થઈ ગઈ છે.',
        '૧૫ ઓગસ્ટ સ્વાતંત્ર્ય પર્વ અને ૨૬ જાન્યુઆરી પ્રજાસત્તાક દિનની ભવ્ય ઉજવણીના ફોટા ગેલેરીમાં ઉપલબ્ધ છે.',
        'જિલ્લા કક્ષાની રમતગમત સ્પર્ધામાં શાળાના વિદ્યાર્થીઓએ પ્રથમ સ્થાન મેળવ્યું છે.',
        'ધોરણ ૧૦ અને ૧૨ બોર્ડ પરીક્ષામાં શાળાનું ઝળહળતું ૧૦૦% પરિણામ!'
      ]
    },
    about: {
      badge: 'અમારા વિશે',
      title: 'નૂતન વિદ્યાલય કરણનગરનો ગૌરવશાળી ઈતિહાસ',
      p1: 'શ્રી નૂતન વિદ્યાલય, કરણનગર (તા. કડી, જી. મહેસાણા) ઉત્તર ગુજરાતની એક અગ્રણી અને સંસ્કારસિંચિત શૈક્ષણિક સંસ્થા છે. ગ્રામીણ અને તાલુકા કક્ષાના વિદ્યાર્થીઓને સર્વોચ્ચ ગુણવત્તાસભર આધુનિક શિક્ષણ આપવાના ઉમદા આશય સાથે આ શાળા કાર્યરત છે.',
      p2: 'અમારો મૂળ મંત્ર "॥ કર ભલા હોગા ભલા ॥" છે. અહીં શિક્ષણ માત્ર પુસ્તકીય નથી, પરંતુ વિદ્યાર્થીના માનસિક, શારીરિક, બૌદ્ધિક અને નૈતિક વિકાસ પર ભાર મૂકવામાં આવે છે.',
      visionTitle: 'અમારો સંકલ્પ (Vision)',
      visionDesc: 'દરેક બાળકને સર્વાંગી શિક્ષણ, સામાજિક મૂલ્યો અને રાષ્ટ્રપ્રેમ સાથે વૈશ્વિક સ્પર્ધામાં અગ્રેસર બનાવવા.',
      missionTitle: 'અમારો ધ્યેય (Mission)',
      missionDesc: 'આધુનિક કમ્પ્યુટર લેબ, પુસ્તકાલય અને રમત-ગમતના શ્રેષ્ઠ માળખા દ્વારા સંસ્કારી નાગરિકોનું નિર્માણ કરવું.',
      valuesTitle: 'મૂળભૂત મૂલ્યો (Core Values)',
      valuesDesc: 'શિસ્ત, પ્રમાણિકતા, સહકાર, સમર્પણ અને રાષ્ટ્રસેવા અમારા પ્રત્યેક કાર્યનો આધારસ્તંભ છે.',
      principalTitle: 'આચાર્યશ્રીનો સંદેશ',
      principalName: 'શ્રી સુરેન્દ્રભાઈ પટેલ',
      principalRole: 'આચાર્ય, નૂતન વિદ્યાલય કરણનગર',
      principalMessage: 'શિક્ષણ એ જીવન બદલવાનું સૌથી શક્તિશાળી સાધન છે. નૂતન વિદ્યાલયમાં અમે વિદ્યાર્થીઓને માત્ર ડિગ્રી નહીં, પણ જીવન જીવવાની કળા અને મજબૂત ચારિત્ર્ય આપીએ છીએ. અમે વાલીઓના વિશ્વાસનું સન્માન કરીએ છીએ.'
    },
    academics: {
      badge: 'શૈક્ષણિક વિભાગો',
      title: 'સંપૂર્ણ અને ગુણવત્તાયુક્ત શિક્ષણ માળખું',
      subtitle: 'બાળકના પ્રારંભિક શિક્ષણથી માંડીને કારકિર્દીના ઘડતર સુધીનું શ્રેષ્ઠ આયોજન',
      prePrimary: 'પૂર્વ પ્રાથમિક / બાલવાટિકા',
      prePrimaryDesc: 'રમતા રમતા શીખવાની આનંદદાયક પદ્ધતિ, મોન્ટેસરી સાધનો અને પ્રવૃત્તિ આધારિત શિક્ષણ.',
      primary: 'પ્રાથમિક વિભાગ (ધોરણ ૧ થી ૮)',
      primaryDesc: 'ગુજરાત સરકારના GSEB અભ્યાસક્રમ મુજબ પાયાનું મજબૂત ગણિત, વિજ્ઞાન, ભાષા અને સંસ્કાર શિક્ષણ.',
      secondary: 'માધ્યમિક વિભાગ (ધોરણ ૯ અને ૧૦)',
      secondaryDesc: 'બોર્ડ પરીક્ષાની ખાસ તૈયારી, દૈનિક પરીક્ષણો, નિષ્ણાત શિક્ષકો અને ૧૦૦% પરિણામલક્ષી માર્ગદર્શન.',
      higherSecondary: 'ઉચ્ચતર માધ્યમિક: સામાન્ય પ્રવાહ (ધોરણ ૧૧ અને ૧૨)',
      higherSecondaryDesc: 'કોમર્સ અને આર્ટ્સ સામાન્ય પ્રવાહ માટે વિષયનિષ્ણાત શિક્ષકો, કમ્પ્યુટર તાલીમ અને કારકિર્દી લક્ષી શિક્ષણ.',
      features: [
        { title: 'ડિજિટલ સ્માર્ટ ક્લાસરૂમ્સ', desc: 'પ્રોજેક્ટર અને ઈન્ટરેક્ટિવ બોર્ડ દ્વારા દ્રશ્ય-શ્રાવ્ય શિક્ષણ.' },
        { title: 'હાઇ-ટેક કમ્પ્યુટર લેબ', desc: 'હાઇ-સ્પીડ ઈન્ટરનેટ સાથે દરેક વિદ્યાર્થી માટે વ્યક્તિગત કમ્પ્યુટર.' },
        { title: 'સમૃદ્ધ પુસ્તકાલય (Library)', desc: '૫,૦૦૦+ થી વધુ પુસ્તકો, જ્ઞાનવર્ધક સામયિકો અને વાચનાલય સુવિધા.' },
        { title: 'વિશાળ રમતનું મેદાન', desc: 'ક્રિકેટ, વોલીબોલ, ખો-ખો, કબડ્ડી અને એથ્લેટિક્સ માટે સંપૂર્ણ ટ્રેક.' },
        { title: 'સલામતી અને શુદ્ધ પાણી', desc: 'સમગ્ર કેમ્પસમાં CCTV સર્વેલન્સ અને RO શુદ્ધ પીવાના પાણીની વ્યવસ્થા.' },
        { title: 'સાંસ્કૃતિક & કલા મંચ', desc: 'નૃત્ય, નાટક, વક્તૃત્વ અને વાર્ષિક મહોત્સવ માટે અદ્યતન સ્ટેજ સુવિધા.' }
      ]
    },
    activities: {
      badge: 'રમત-ગમત & સહ-અભ્યાસિક પ્રવૃત્તિઓ',
      title: 'Sports & Co-Curricular Activities: રમો • શીખો • આગળ વધો',
      subtitle: 'પુસ્તકોની સાથે રમત-ગમત અને કલામાં બાળકોની આંતરિક પ્રતિભા ખીલવવાની વિશેષ વ્યવસ્થા',
      posterNotice: 'શાળાના સત્તાવાર પ્રવૃત્તિ પોસ્ટર મુજબની વિશેષતાઓ:',
      items: [
        { name: 'ચેસ (Chess)', desc: 'બૌદ્ધિક વિકાસ, એકાગ્રતા અને વ્યુહરચનાત્મક વિચારસરણી માટે પ્રોત્સાહન.', icon: 'fa-chess' },
        { name: 'ચિત્રકામ & હસ્તકલા (Art & Craft)', desc: 'સર્જનાત્મકતા અને સૌંદર્યદ્રષ્ટિનો વિકાસ કરતું રંગબેરંગી વાતાવરણ.', icon: 'fa-palette' },
        { name: 'સંગીત & ગાયન (Music)', desc: 'શાસ્ત્રીય સંગીત, હાર્મોનિયમ, તબલા અને સુગમ સંગીતની તાલીમ.', icon: 'fa-music' },
        { name: 'યોગ & ધ્યાન (Yoga)', desc: 'શારીરિક તંદુરસ્તી, માનસિક શાંતિ અને આધ્યાત્મિક જાગૃતિ માટે દૈનિક યોગાભ્યાસ.', icon: 'fa-spa' },
        { name: 'નૃત્ય & નાટ્ય (Dance & Drama)', desc: 'પરંપરાગત લોકનૃત્ય, ગરબા અને સ્ટેજ પર્ફોર્મન્સ દ્વારા આત્મવિશ્વાસ.', icon: 'fa-masks-theater' },
        { name: 'વક્તૃત્વ & વાદ-વિવાદ (Debate & Elocution)', desc: 'ભાષાશુદ્ધિ, સ્ટેજ ભય નિવારણ અને પ્રભાવશાળી વ્યક્તિત્વ ઘડતર.', icon: 'fa-microphone' },
        { name: 'મેદાની રમતો (Outdoor Sports)', desc: 'ક્રિકેટ, વોલીબોલ, બેડમિન્ટન, ખો-ખો, કબડ્ડી અને ટ્રેક ઇવેન્ટ્સ.', icon: 'fa-volleyball' },
        { name: 'કરાટે & સ્વ-રક્ષણ (Karate / Martial Arts)', desc: 'આત્મરક્ષણ, માનસિક સંયમ અને શારીરિક મનોબળ માટે બ્લેક બેલ્ટ કોચિંગ.', icon: 'fa-hand-fist' }
      ],
      bottomTags: ['રમતો (Sports)', 'સર્જનાત્મક કલા (Creative Arts)', 'સાંસ્કૃતિક પ્રવૃત્તિઓ (Cultural)', 'ક્લબ્સ & સ્પર્ધાઓ (Clubs & Competitions)', 'સર્વાંગી વિકાસ (Overall Development)']
    },
    celebrations: {
      badge: 'રાષ્ટ્રીય પર્વો અને ગૌરવ દિન',
      title: '૧૫ ઓગસ્ટ સ્વાતંત્ર્ય દિન અને ૨૬ જાન્યુઆરી પ્રજાસત્તાક દિન ઉજવણી',
      subtitle: 'નૂતન વિદ્યાલય કરણનગરમાં દેશભક્તિના રંગે રંગાતા વિદ્યાર્થીઓ અને રાષ્ટ્રધ્વજ વંદના',
      indepTitle: '૧૫ ઓગસ્ટ - સ્વાતંત્ર્ય દિન મહોત્સવ (Independence Day)',
      indepDesc: 'દર વર્ષે ૧૫ ઓગસ્ટે શાળા પરિસરમાં ભવ્ય ત્રિરંગા યાત્રા અને ધ્વજવંદન કાર્યક્રમ યોજાય છે. વિદ્યાર્થીઓ હાથમાં તિરંગો લઈને દેશભક્તિના નારા સાથે કરણનગર ગામમાં પ્રભાતફેરી કાઢે છે. શહીદોને શ્રદ્ધાંજલિ, દેશભક્તિ ગીતો અને સાંસ્કૃતિક નૃત્યો રજૂ કરવામાં આવે છે.',
      repubTitle: '૨૬ જાન્યુઆરી - પ્રજાસત્તાક દિન ગૌરવ સમારોહ (Republic Day)',
      repubDesc: 'ભારતીય બંધારણના અમલીકરણના પવિત્ર દિવસે કરણનગર શાળા પરિવાર દ્વારા રાષ્ટ્રધ્વજને સલામી અપાય છે. ભારત માતાની વેશભૂષા ધારણ કરી વિદ્યાર્થીનીઓ દ્વારા દેશપ્રેમનું જીવંત પ્રદર્શન, સંવિધાન સંકલ્પ, પરેડ અને વિશેષ નાટિકા પ્રસ્તુત કરવામાં આવે છે.',
      features: [
        'વિદ્યાર્થીઓ દ્વારા ભવ્ય ત્રિરંગા રેલી & દેશભક્તિ પ્રભાતફેરી',
        'ભારત માતા પૂજન, રાષ્ટ્રગીત ગાન અને ત્રિરંગાને સલામી',
        'સાંસ્કૃતિક દેશભક્તિ નાટકો અને એકપાત્રીય અભિનય',
        'તેજસ્વી વિદ્યાર્થીઓ અને રમતવીરોનું સન્માન અને ટ્રોફી વિતરણ'
      ]
    },
    gallery: {
      badge: 'યાદગાર ક્ષણો',
      title: 'શાળા ફોટો ગેલેરી (School Photo Gallery)',
      subtitle: 'અમારા ઉત્સવો, શિક્ષણ, રમત-ગમત અને પરિસરની ઝાંખી',
      filterAll: 'તમામ ફોટા',
      filterNational: 'રાષ્ટ્રીય પર્વો (૧૫ ઓગસ્ટ / ૨૬ જાન્યુઆરી)',
      filterActivities: 'રમત-ગમત & કલા',
      filterCampus: 'શાળા પરિસર & સુવિધાઓ',
      filterAcademic: 'શૈક્ષણિક & સુવિધાઓ',
      viewLarge: 'મોટો ફોટો જુઓ',
      close: 'બંધ કરો'
    },
    notices: {
      badge: 'સૂચના પટ્ટ',
      title: 'મહત્વપૂર્ણ પરિપત્રો અને સૂચનાઓ',
      subtitle: 'વાલીઓ અને વિદ્યાર્થીઓ માટે તાજેતરની માહિતી',
      items: [
        { date: '૧૫ માર્ચ, ૨૦૨૬', title: 'નવા શૈક્ષણિક વર્ષ ૨૦૨૬-૨૭ માટે પ્રવેશ ફોર્મ ભરવાની છેલ્લી તારીખ', tag: 'પ્રવેશ' },
        { date: '૧૦ માર્ચ, ૨૦૨૬', title: 'વાર્ષિક પરીક્ષા સમયપત્રક અને હોલ ટિકિટ વિતરણ બાબત', tag: 'પરીક્ષા' },
        { date: '૨૮ ફેબ્રુઆરી, ૨૦૨૬', title: 'રાષ્ટ્રીય વિજ્ઞાન દિન નિમિત્તે શાળામાં પ્રદર્શન આયોજન', tag: 'કાર્યક્રમ' },
        { date: '૨૦ ફેબ્રુઆરી, ૨૦૨૬', title: 'વાલી મંડળની સામાન્ય સભાનું આયોજન (સમય: સવારે ૯:૦૦ કલાકે)', tag: 'મીટિંગ' }
      ]
    },
    admission: {
      badge: 'પ્રવેશ પ્રક્રિયા',
      title: 'ઓનલાઇન પ્રવેશ અરજી ફોર્મ (Online Admission Form)',
      subtitle: 'શ્રી નૂતન વિદ્યાલય કરણનગરમાં આપના બાળકના ઉજ્જવળ ભવિષ્ય માટે નીચેનું ફોર્મ ભરો. અરજી સફળતાપૂર્વક સબમિટ થતાં શાળા કાર્યાલયને આપોઆપ મોકલાઈ જશે.',
      formNotice: 'લાલ રંગના ફુદડી (*) વાળા તમામ ખાના ભરવા ફરજિયાત છે.',
      
      sec1Title: '૧. વિદ્યાર્થીની માહિતી (Student Information)',
      studentName: 'વિદ્યાર્થીનું પૂરું નામ (અટક + નામ + પિતાનું નામ)',
      studentNameReq: 'વિદ્યાર્થીનું પૂરું નામ જરૂરી છે',
      dob: 'જન્મ તારીખ',
      dobReq: 'જન્મ તારીખ પસંદ કરો',
      gender: 'જાતિ (Gender)',
      genderReq: 'જાતિ પસંદ કરો',
      genderMale: 'પુરુષ (Male)',
      genderFemale: 'સ્ત્રી (Female)',
      genderOther: 'અન્ય (Other)',
      standard: 'કયા ધોરણમાં પ્રવેશ લેવો છે? (Standard)',
      standardReq: 'પ્રવેશ મેળવવાનું ધોરણ પસંદ કરો',
      standardPlaceholder: '-- ધોરણ પસંદ કરો --',
      academicYear: 'શૈક્ષણિક વર્ષ (Academic Year)',
      academicYearReq: 'શૈક્ષણિક વર્ષ પસંદ કરો',

      sec2Title: '૨. વાલી / માતા-પિતાની માહિતી (Parent/Guardian Information)',
      fatherName: 'પિતાનું પૂરું નામ',
      fatherNameReq: 'પિતાનું નામ જરૂરી છે',
      motherName: 'માતાનું પૂરું નામ',
      motherNameReq: 'માતાનું નામ જરૂરી છે',
      mobile: 'મોબાઇલ નંબર (૧૦ અંક)',
      mobileReq: 'માન્ય ૧૦ અંકનો મોબાઇલ નંબર દાખલ કરો',
      email: 'ઈમેલ સરનામું (વૈકલ્પિક)',
      address: 'રહેઠાણનું પૂરું સરનામું (ગામ, સોસાયટી, તાલુકો, જિલ્લો)',
      addressReq: 'રહેઠાણનું પૂરું સરનામું જરૂરી છે',

      sec3Title: '૩. અગાઉની શાળાની માહિતી (Previous School Information)',
      prevSchoolName: 'અગાઉની શાળાનું નામ',
      prevStandard: 'અગાઉનું ધોરણ',
      prevBoard: 'અગાઉની શાળાનું બોર્ડ (GSEB, CBSE, વગેરે)',

      sec4Title: '૪. વધારાની માહિતી (Additional Information)',
      hearAbout: 'તમને અમારી શાળા વિશે ક્યાંથી જાણવા મળ્યું?',
      hearOptions: [
        'અગાઉના વિદ્યાર્થી / વાલી મારફતે',
        'સોશિયલ મીડિયા / વેબસાઇટ',
        'શાળાના બેનર / પત્રિકા',
        'શિક્ષક અથવા સંબંધી દ્વારા',
        'અન્ય'
      ],
      suggestion: 'અન્ય કોઈ સૂચન અથવા સંદેશ',
      suggestionPlaceholder: 'આપનું કોઈ ખાસ સૂચન અથવા પ્રશ્ન હોય તો અહીં લખો...',

      submitBtn: 'ઓનલાઇન પ્રવેશ અરજી સબમિટ કરો',
      submitting: 'અરજી મોકલાઈ રહી છે, કૃપા કરી રાહ જુઓ...',
      emailServiceNote: 'નોંધ: આપની ઓનલાઇન અરજી શાળા કાર્યાલયને સુરક્ષિત રીતે પહોંચાડવામાં આવશે.',
      
      successTitle: 'પ્રવેશ અરજી સફળતાપૂર્વક સ્વીકારાઈ ગઈ છે!',
      successSubtitle: 'આપની પ્રવેશ અરજી શાળા કાર્યાલયમાં સુરક્ષિત રીતે નોંધાઈ ગઈ છે.',
      appIdLabel: 'અરજી ક્રમાંક (Application No)',
      dateLabel: 'અરજી તારીખ',
      printSlip: 'પ્રવેશ પહોંચ પ્રિન્ટ કરો (Print Slip)',
      downloadPdf: 'ડાઉનલોડ કરો',
      submitAnother: 'બીજી અરજી ભરો',
      closeModal: 'બંધ કરો'
    },
    contact: {
      badge: 'સંપર્ક કરો',
      title: 'અમારો સંપર્ક કરો (Contact Us)',
      subtitle: 'શાળા પરિસરની મુલાકાત માટે અથવા કોઈ પણ માહિતી માટે આપનું હાર્દિક સ્વાગત છે.',
      schoolName: 'શ્રી નૂતન વિદ્યાલય કરણનગર',
      addressLabel: 'સરનામું',
      addressValue: 'નૂતન વિદ્યાલય, કરણનગર ગામ, તા. કડી, જી. મહેસાણા, ઉત્તર ગુજરાત - ૩૮૨૭૧૫',
      timingLabel: 'શાળા & કાર્યાલય સમય',
      timingValue: 'સોમવાર થી શનિવાર: સવારે ૭:૩૦ થી બપોરે ૧:૦૦ (રવિવારે રજા)',
      trustLabel: 'સંચાલક મંડળ',
      trustValue: 'શ્રી કરણનગર કેળવણી મંડળ - કરણનગર (કડી-મહેસાણા)',
      quickFormTitle: 'સીધો સંદેશ મોકલો',
      yourName: 'આપનું પૂરું નામ',
      yourPhone: 'મોબાઇલ નંબર',
      yourSubject: 'વિષય',
      yourMessage: 'સંદેશ',
      sendMessage: 'સંદેશ મોકલો',
      messageSent: 'આપનો સંદેશ મળી ગયો છે. અમે ટૂંક સમયમાં સંપર્ક કરીશું!'
    },
    footer: {
      desc: 'નૂતન વિદ્યાલય કરણનગર - ૩૫+ વર્ષોથી સંસ્કાર અને ગુણવત્તાયુક્ત શિક્ષણ દ્વારા ગુજરાતના બાળકોના ઉજ્જવળ ભવિષ્યનું ઘડતર કરતી પ્રતિષ્ઠિત સંસ્થા.',
      quickLinks: 'ઝડપી લિંક્સ',
      standards: 'શૈક્ષણિક ધોરણો',
      connect: 'શાળા પરિસર',
      rights: 'તમામ હક્કો સ્વાધીન છે.',
      motto: '॥ કર ભલા હોગા ભલા ॥',
      adminLogin: 'એડમિન પોર્ટલ'
    },
    admin: {
      title: 'પ્રવેશ અરજી રજિસ્ટર (Admission Applications Portal)',
      subtitle: 'ઓનલાઇન સબમિટ થયેલી તમામ વિદ્યાર્થી અરજીઓની યાદી',
      totalCount: 'કુલ અરજીઓ:',
      searchPlaceholder: 'વિદ્યાર્થીનું નામ, વાલીનું નામ અથવા ફોન નંબર શોધો...',
      exportCsv: 'CSV એક્સપોર્ટ',
      noData: 'હજુ સુધી કોઈ પ્રવેશ અરજી નોંધાઈ નથી.',
      tableNo: 'ક્રમ',
      tableId: 'અરજી નં.',
      tableName: 'વિદ્યાર્થી નામ',
      tableStd: 'ધોરણ',
      tableParent: 'પિતાનું નામ & ફોન',
      tableDate: 'તારીખ',
      tableActions: 'ક્રિયા',
      viewPrint: 'પ્રિન્ટ / વિગત'
    }
  },

  en: {
    topbar: {
      address: 'Karannagar, Ta. Kadi, Dist. Mehsana, North Gujarat - 382715',
      trust: 'Managed by Shree Karannagar Kelavani Mandal',
      affiliation: 'GSEB Recognized | Reg. No: 25/Guj/1982',
      admissionOpen: 'Admissions Open for Academic Year 2026-27!'
    },
    nav: {
      brandTitle: 'Nootan Vidhyalaya Karannagar',
      brandSubtitle: '॥ Kar Bhala Hoga Bhala ॥',
      home: 'Home',
      about: 'About Us',
      academics: 'Academics',
      activities: 'Activities',
      celebrations: 'National Days',
      gallery: 'Gallery',
      notices: 'Notices',
      admission: 'Online Admission',
      contact: 'Contact',
      adminPortal: 'Admissions List'
    },
    hero: {
      badge: 'Pursuit of Excellence • Cherished Legacy',
      title: 'The Sacred Temple of Values, Education & Dedication',
      subtitle: 'Shree Nootan Vidhyalaya, Karannagar - Where students receive top-notch education rooted in culture, discipline, sportsmanship, and national pride.',
      ctaAdmission: 'Apply for Admission Online',
      ctaExplore: 'Explore School Campus',
      ctaCall: 'Contact Us',
      statYears: '35+ Years',
      statYearsDesc: 'Of Glorious Educational Heritage',
      statStudents: '1200+',
      statStudentsDesc: 'Bright Students',
      statResults: '100%',
      statResultsDesc: 'GSEB Board Result Track Record',
      statFaculty: '40+',
      statFacultyDesc: 'Experienced & Devoted Teachers'
    },
    ticker: {
      label: 'Latest News',
      items: [
        'Online admissions open for the Academic Year 2026-2027 across all standards.',
        'Grand 15 August Independence Day and 26 January Republic Day celebration photos are now live in the gallery.',
        'School students secured top positions at District Level Athletic Competitions.',
        'Outstanding 100% result achieved in Std 10 & Std 12 Board Examinations!'
      ]
    },
    about: {
      badge: 'About Us',
      title: 'The Inspiring Legacy of Nootan Vidhyalaya Karannagar',
      p1: 'Shree Nootan Vidhyalaya, Karannagar (Taluka Kadi, District Mehsana) is a prominent educational institution of North Gujarat. Founded with the mission to impart highest-standard modern education infused with Indian moral values to rural and suburban youth.',
      p2: 'Our guiding principle is the sacred motto "॥ Kar Bhala Hoga Bhala ॥" (Do good and good will come to you). We emphasize not merely rote academic training, but the holistic physical, intellectual, and moral growth of every child.',
      visionTitle: 'Our Vision',
      visionDesc: 'To empower every student with holistic education, moral values, and patriotic zeal to excel confidently in the global arena.',
      missionTitle: 'Our Mission',
      missionDesc: 'To foster virtuous, capable citizens through modern IT labs, library, sports infrastructure, and devoted mentorship.',
      valuesTitle: 'Core Values',
      valuesDesc: 'Discipline, Integrity, Empathy, Cooperation, and National Service form the foundational pillars of our daily institution life.',
      principalTitle: "Principal's Desk",
      principalName: 'Shri Surendrabhai Patel',
      principalRole: 'Principal, Nootan Vidhyalaya Karannagar',
      principalMessage: 'Education is the most transformative power in the universe. At Nootan Vidhyalaya, we cultivate character, fortitude, and knowledge. We deeply value the trust parents bestow upon us and commit to shaping every child into an enlightened leader of tomorrow.'
    },
    academics: {
      badge: 'Academic Framework',
      title: 'Comprehensive & High-Caliber Educational Curriculum',
      subtitle: 'A seamlessly structured journey from foundational early childhood to higher secondary career excellence',
      prePrimary: 'Pre-Primary / Balvatika',
      prePrimaryDesc: 'Playful activity-based pedagogy, Montessori sensorial apparatus, and tender personal attention.',
      primary: 'Primary Section (Std 1 to 8)',
      primaryDesc: 'Rigorous GSEB foundation in Mathematics, Sciences, Languages, Social Sciences, and moral values.',
      secondary: 'Secondary Section (Std 9 & 10)',
      secondaryDesc: 'Intensive board exam preparation, daily evaluation tests, specialized faculty mentoring, and a proven 100% pass rate.',
      higherSecondary: 'Higher Secondary: General Stream (Std 11 & 12)',
      higherSecondaryDesc: 'Commerce & Arts General Stream featuring specialized instruction, business economics, and career guidance.',
      features: [
        { title: 'Digital Smart Classrooms', desc: 'Audio-visual interactive whiteboards and rich multimedia learning modules.' },
        { title: 'Modern Computer Laboratory', desc: 'High-speed broadband internet with 1:1 computer workstation allocation.' },
        { title: 'Comprehensive Library', desc: '5,000+ volumes, educational journals, periodicals, and quiet reading study spaces.' },
        { title: 'Expansive Sports Grounds', desc: 'Dedicated facilities for Cricket, Volleyball, Badminton, Kho-Kho, Kabaddi, and Athletics.' },
        { title: 'Campus Safety & Pure RO Water', desc: 'Full-campus CCTV surveillance coverage and industrial RO purified drinking water systems.' },
        { title: 'Cultural & Art Stage', desc: 'Modern stage facilities for music, drama, public speaking, and annual celebrations.' }
      ]
    },
    activities: {
      badge: 'Sports & Co-Curricular',
      title: 'Sports & Co-Curricular Activities: Play • Learn • Grow',
      subtitle: 'Nurturing hidden talents, sportsmanship, and artistic expression alongside academic learning',
      posterNotice: 'Featured directly from our Official School Activities Program:',
      items: [
        { name: 'Chess', desc: 'Enhancing cognitive strategy, concentration, analytical thinking, and mental stamina.', icon: 'fa-chess' },
        { name: 'Art & Craft', desc: 'Stimulating creativity, fine motor skills, and aesthetic sensibilities through colors and crafts.', icon: 'fa-palette' },
        { name: 'Music', desc: 'Vocal classical, harmonium, tabla, and keyboard instrumental training.', icon: 'fa-music' },
        { name: 'Yoga', desc: 'Daily asanas, pranayama, and meditation for robust physical fitness and emotional calmness.', icon: 'fa-spa' },
        { name: 'Dance & Cultural Arts', desc: 'Traditional Gujarati folk dances, classical garba, and theatrical stage performance skills.', icon: 'fa-masks-theater' },
        { name: 'Debate & Elocution', desc: 'Mastering public oratory, voice modulation, critical thinking, and fluent stage presence.', icon: 'fa-microphone' },
        { name: 'Outdoor Sports', desc: 'Football, Cricket, Volleyball, Badminton, Kho-Kho, Kabaddi, and running track events.', icon: 'fa-volleyball' },
        { name: 'Karate & Self-Defense', desc: 'Black belt coaching providing discipline, agility, reflexes, and confident self-defense.', icon: 'fa-hand-fist' }
      ],
      bottomTags: ['Sports', 'Creative Arts', 'Cultural Activities', 'Clubs & Competitions', 'Overall Development']
    },
    celebrations: {
      badge: 'National Festivals & Pride',
      title: 'Grand 15 August Independence Day & 26 January Republic Day Celebrations',
      subtitle: 'Witnessing our students immerse in true patriotic fervor, tricolor parades, and cultural tributes',
      indepTitle: '15 August - Independence Day Celebration',
      indepDesc: 'Every 15th of August, the school campus bursts into patriotic euphoria with our grand Tricolor Flag Rally. Students carrying national flags march through Karannagar village chanting patriotic slogans, followed by ceremonial flag hoisting, tributes to freedom fighters, and soulful patriotic songs.',
      repubTitle: '26 January - Republic Day Celebration',
      repubDesc: 'On the historic day marking the adoption of the Indian Constitution, the Nootan Vidhyalaya family unfurls the national tricolor with military-like salutes. Student portrayals of Bharat Mata, patriotic theatrical dramas, constitutional pledges, and vibrant student dances elevate the spirit of Mother India.',
      features: [
        'Vibrant student Tiranga march & village morning prabhat pheri',
        'Bharat Mata reverence, national anthem recital & tri-color salute',
        'Inspiring patriotic plays, speeches, and classical patriotic dances',
        'Meritorious awards, academic shields, and sports trophy felicitations'
      ]
    },
    gallery: {
      badge: 'Cherished Memories',
      title: 'School Photo Gallery',
      subtitle: 'Capturing the vibrant life, spirit, events, and campus moments of Nootan Vidhyalaya',
      filterAll: 'All Photos',
      filterNational: 'National Days (15 Aug / 26 Jan)',
      filterActivities: 'Sports & Arts',
      filterCampus: 'Campus & Facilities',
      filterAcademic: 'Academic & Labs',
      viewLarge: 'View Large',
      close: 'Close'
    },
    notices: {
      badge: 'Notice Board',
      title: 'Important Announcements & Circulars',
      subtitle: 'Latest updates for parents, students, and guardians',
      items: [
        { date: 'March 15, 2026', title: 'Last date for submission of Online Admission Forms for Academic Year 2026-27', tag: 'Admission' },
        { date: 'March 10, 2026', title: 'Annual Examination Schedule and Hall Ticket Distribution Notification', tag: 'Exam' },
        { date: 'February 28, 2026', title: 'Grand School Exhibition on National Science Day', tag: 'Event' },
        { date: 'February 20, 2026', title: 'Parent-Teacher Association General Meeting (Time: 9:00 AM)', tag: 'Meeting' }
      ]
    },
    admission: {
      badge: 'Admission Portal',
      title: 'Online Student Admission Application Form',
      subtitle: 'Enroll your child into Shree Nootan Vidhyalaya Karannagar for a glorious future. Complete the form below; all details will be securely submitted to the school administration.',
      formNotice: 'Fields marked with an asterisk (*) are mandatory.',
      
      sec1Title: '1. Student Information (વિદ્યાર્થીની માહિતી)',
      studentName: "Student's Full Name (Surname + Name + Father's Name)",
      studentNameReq: "Student's full name is required",
      dob: 'Date of Birth',
      dobReq: 'Please select date of birth',
      gender: 'Gender',
      genderReq: 'Please select gender',
      genderMale: 'Male (પુરુષ)',
      genderFemale: 'Female (સ્ત્રી)',
      genderOther: 'Other (અન્ય)',
      standard: 'Admission Desired for Standard / Grade',
      standardReq: 'Please select standard',
      standardPlaceholder: '-- Select Standard --',
      academicYear: 'Academic Year',
      academicYearReq: 'Please select academic year',

      sec2Title: '2. Parent / Guardian Information (વાલી / માતા-પિતાની માહિતી)',
      fatherName: "Father's Full Name",
      fatherNameReq: "Father's full name is required",
      motherName: "Mother's Full Name",
      motherNameReq: "Mother's full name is required",
      mobile: 'Mobile Number (10 Digits)',
      mobileReq: 'Please enter a valid 10-digit mobile number',
      email: 'Email Address (Optional)',
      address: 'Full Residential Address (Village, Society, Taluka, District)',
      addressReq: 'Full residential address is required',

      sec3Title: '3. Previous School Information (અગાઉની શાળાની માહિતી)',
      prevSchoolName: 'Previous School Name',
      prevStandard: 'Previous Standard / Grade',
      prevBoard: 'Previous School Board (GSEB, CBSE, etc.)',

      sec4Title: '4. Additional Information (વધારાની માહિતી)',
      hearAbout: 'How did you hear about our school?',
      hearOptions: [
        'Through an existing student or parent',
        'Social media or school website',
        'School banner or brochure',
        'Through a teacher or relative',
        'Other'
      ],
      suggestion: 'Any Suggestions or Message',
      suggestionPlaceholder: 'Write any specific note, query, or suggestion here...',

      submitBtn: 'Submit Admission Application',
      submitting: 'Submitting application, please wait...',
      emailServiceNote: 'Note: Your application will be submitted securely to the school office.',
      
      successTitle: 'Admission Application Submitted Successfully!',
      successSubtitle: 'Your application has been registered with the school administration.',
      appIdLabel: 'Application Number',
      dateLabel: 'Submission Date',
      printSlip: 'Print Admission Slip',
      downloadPdf: 'Download Slip',
      submitAnother: 'Submit Another Application',
      closeModal: 'Close'
    },
    contact: {
      badge: 'Contact Information',
      title: 'Get in Touch with Us',
      subtitle: 'We warmly welcome visits to our campus and inquiries regarding admissions and academics.',
      schoolName: 'Shree Nootan Vidhyalaya Karannagar',
      addressLabel: 'Campus Address',
      addressValue: 'Nootan Vidhyalaya, Karannagar Village, Taluka Kadi, Dist. Mehsana, North Gujarat - 382715',
      timingLabel: 'Office Hours',
      timingValue: 'Monday to Saturday: 7:30 AM to 1:00 PM (Closed on Sundays)',
      trustLabel: 'Management Board',
      trustValue: 'Shree Karannagar Kelavani Mandal - Karannagar (Kadi-Mehsana)',
      quickFormTitle: 'Send Direct Message',
      yourName: 'Your Full Name',
      yourPhone: 'Mobile Number',
      yourSubject: 'Subject',
      yourMessage: 'Message',
      sendMessage: 'Send Message',
      messageSent: 'Thank you! Your inquiry has been received. We will respond promptly.'
    },
    footer: {
      desc: 'Nootan Vidhyalaya Karannagar - 35+ years of exemplary character building and academic excellence for students of North Gujarat.',
      quickLinks: 'Quick Links',
      standards: 'Academic Standards',
      connect: 'School Campus',
      rights: 'All Rights Reserved.',
      motto: '॥ Kar Bhala Hoga Bhala ॥',
      adminLogin: 'Admissions Portal'
    },
    admin: {
      title: 'Student Admission Register (Admin Portal)',
      subtitle: 'Complete list of online submitted student applications',
      totalCount: 'Total Submissions:',
      searchPlaceholder: 'Search student name, parent name, or mobile number...',
      exportCsv: 'Export to CSV',
      noData: 'No admission applications received yet.',
      tableNo: 'Sr.',
      tableId: 'App No.',
      tableName: 'Student Name',
      tableStd: 'Standard',
      tableParent: "Father's Name & Phone",
      tableDate: 'Date',
      tableActions: 'Action',
      viewPrint: 'Print / View'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly currentLang = signal<Language>('gu');

  readonly t = computed(() => {
    return TRANSLATIONS[this.currentLang()];
  });

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('nv_lang') as Language;
      if (saved === 'gu' || saved === 'en') {
        this.currentLang.set(saved);
        this.updateHtmlLang(saved);
      } else {
        this.updateHtmlLang('gu');
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('nv_lang', lang);
    }
    this.updateHtmlLang(lang);
  }

  toggleLanguage(): void {
    const next: Language = this.currentLang() === 'gu' ? 'en' : 'gu';
    this.setLanguage(next);
  }

  private updateHtmlLang(lang: Language): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      if (lang === 'en') {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-gu');
      } else {
        document.body.classList.add('lang-gu');
        document.body.classList.remove('lang-en');
      }
    }
  }
}
