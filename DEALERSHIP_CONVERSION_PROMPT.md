# 🚗 DEALERSHIP WEBSITE CONVERSION PROMPT

Use this prompt template every time you need to convert this car dealership website to a new dealership. Fill in all the bracketed values with the specific details for the new dealership.

---

## PROMPT TO USE:

```
I need you to convert this car dealership website to a new dealership. Make all necessary changes throughout the codebase based on the following information:

**DEALERSHIP DETAILS:**
- Existing website: https://www.editioncars.es/
- Dealership Name: EDITION CARS
- Phone Number:  93 370 40 30 / 610 20 21 00 
- Email Address: info@editioncars.es
- Street Address: Carretera Ca l'Alaio, 3 - El Prat de Llobregat - 08820 Barcelona
- City/Postal:  Carretera Ca l'Alaio, 3 - El Prat de Llobregat - 08820 Barcelona
- Facebook URL: None
- Instagram URL: 
- Google Maps Location URL: https://maps.app.goo.gl/j94p4AomKP1eQmBe9
data=!3m1!4b1!4m6!3m5!1s0xd422d0aae13ce4b:0xeb0c0a1870db7983!8m2!3d40.5432558!4d-3.6105019!16s%2Fg%2F11vwy0my2t?entry=tts&g_ep=EgoyMDI1MTAyNy4wIPu8ASoASAFQAw%3D%3D&skid=54bf610b-042c-4933-a6b1-db155b5e0a36
- Google Maps Embed URL: <iframe src="<iframe src="<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0405601081934!2d2.0816076758755564!3d41.32973137130727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49eb971dab66f%3A0x3978cef3b06e5d0a!2sEDITION%20CARS%20SL.!5e0!3m2!1sen!2sin!4v1780290117324!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
- Google Rating: 4.1

**BRANDING:**
- Primary Color Hex: #010307

**CONFIGURATION:**
- Profile ID: a5dd8bbf-2f7b-4b79-8246-f6fa76ecd0f9
- API_BASE_URL = https://multipost-public.app.infinit.cc

**REQUIREMENTS:**
1. Replace all instances of "INFINIT Cars" with the new dealership name (keep the Powered by INFINIT in the footer though)
2. Keep only the ES language and remove the language slector in the footer (keep Euro and Km units though)
3. Use CRUL to download logo (usually from the header) and favicon from the exisiting website and use it to replace the INFINIT ones
4. Update all contact information (phone, email, address, social media URLS)
5. Update Google Maps locations (both URL and embed URL)
6. Fetch the latest 5 (4 or 5 stars) google reviews from Google Maps and update the copy of the homepage component accordingly
6. Change primary brand color throughout the theme
7. Update profile_id in the API service
8. Update SEO metadata: update the `seo` section in translation files (per-page titles and descriptions reference "INFINIT Cars" — replace with the new dealership name), and update the fallback meta tags in index.html (title, description, og:title, og:description)
9. Update project name in wrangler.toml using the folder name
10. Update any hardcoded references to the old branding
11. Update the domain for fetching the stock or submiting a contact form to API_BASE_URL
12. Use CRUL to read the copy in the homepage of the existing website and update the homepage accordingly
13. Update api/preview.ts file with the correct Profile ID (line 3) and domain name from the existing website (lines 122, 123, 129, 137-138)
14. redesign goolge review section with premium verion , add background image with dark overlay , redesign the cards of google reviews make it stylish - dark premium design think out pf the box and redesign it , one review at a time with the auto coursol 
15. add colors to these cards present on service page differn differnt colors full with premum modern look use some styles popups shadeows flexex
16. cross check all the inforamtion in footer section is correct and accurate , in header section full address should be ther cross check hours and the phone number
17. redesign the FAQ section , add icons to it , cross check all the questions and answers it should be related to the current website . only 5 Faq if more than that we have then add a button to see the other remaining questions
18.  add background image to this section on servicio page and financian page  and bring text at centre give a dark overlay to background image and restyle the text we have to look premium add some icons and styles
19. use shadow effects , differnt layouts , cards styles , flip flop , pop up , diffenrt themans , backgorund images
20.download all the images they have on thier official website and replace it with ours i want same images to same sections as they have
21.¡Descubre nuestros vehículos! - can you add light capacity background image to this section , aslo add the coursol to see the cars means 4 cars shoudl be visible and to see fifith one we should use coursol and addround shaped cousol buttons to the top eight corner of the section
22. i want the car stock page , finacne , service , contact page in white theme now dark theme 
23. cross check the footer - ots looking too much long , add colours to all logos present , cross check all services options make them correct and clickable , text should be visible more increase capacity , add icons , fill them will design ,logo should be effective
24. i want menu bar horizontal with centred 

INSTURCTIONS:
When download or storing the assets of the website, use the src/assets folder

Please make all these changes systematically and confirm when complete.
```

---

## 📋 INSTRUCTIONS FOR USE:

### Before Starting:
1. Create a new folder by copying this repo
2. Navigate to the new folder in your terminal
3. Open Claude Code in that folder

### Prepare Your Information:

#### 1. Logo File
- Have the logo file ready in PNG format (preferably with transparent background)
- Note the full file path on your computer

#### 2. Google Maps URLs
- **Regular URL**:
  - Go to Google Maps
  - Search for the dealership address
  - Click "Share" button
  - Select "Copy link"

- **Embed URL**:
  - While still on Google Maps at the location
  - Click "Share" button
  - Select "Embed a map" tab
  - Copy the `src` URL from the iframe code (the part inside `src="..."`)

#### 3. Profile ID
- Obtain from your backend/admin system
- Should be a UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Execute:
1. Fill in ALL the bracketed values in the prompt above
2. Copy the completed prompt
3. Paste into Claude Code
4. Review the changes after completion

---

## 💡 TIPS & BEST PRACTICES:

### Color Selection
- **HSL Format**: In Chrome DevTools color picker, switch to HSL mode
- Format: `hsl(210, 100%, 50%)` becomes `"210 100% 50%"`
- The three numbers represent: Hue (0-360), Saturation (0-100%), Lightness (0-100%)
- For reference, also note the hex code for easier communication

### Logo Requirements
- **Format**: PNG with transparent background preferred, or SVG
- **Orientation**: Landscape/horizontal orientation works best
- **Size**: At least 300px wide for good quality
- **File naming**: Will be renamed automatically to match the project

### Phone Number Format
- Include country code (e.g., +34 for Spain, +33 for France, +44 for UK)
- No spaces or special characters (or keep them consistent)
- This will be used for click-to-call functionality

### Address Format
- **Street Address**: Include building number, floor, apartment if applicable
- **City/Postal**: Include postal code and country
- Be precise - this will be shown to customers seeking directions

### Language Codes
- `es` = Spanish (Español)
- `en` = English
- `fr` = French (Français)

---

## 📁 FILES THAT WILL BE MODIFIED:

This prompt will systematically update:

### Critical Configuration:
- `src/contexts/LanguageContext.tsx` - Contact info, address, maps
- `src/services/carsApi.ts` - Profile ID
- `src/index.css` - Primary brand color
- `index.html` - SEO metadata, title, favicon
- `wrangler.toml` - Project name
- `api/preview.ts` - Profile ID and domain for social media preview cards

### Translations (including per-page SEO metadata in the `seo` section):
- `src/translations/es.json`
- `src/translations/en.json`
- `src/translations/fr.json`

### Assets:
- Logo files in `src/assets/` and `public/`

### Components:
- `src/components/Header.tsx` - Language selector hiding, logo
- `src/components/Footer.tsx` - Contact info, legal text
- `src/components/FloatingWhatsApp.tsx` - WhatsApp integration
- Contact forms in multiple pages

---

## ⚠️ IMPORTANT NOTES:

1. **Language Selector**: Will be hidden from UI but language files remain for potential future use
2. **All Translation Files**: Even though only one language is used, all three translation files will be updated with the new dealership information
3. **Profile ID**: Critical for loading correct inventory from API - double-check this value
4. **Testing**: After conversion, test the contact form, map links, and vehicle inventory loading
5. **Deployment**: Remember to create new remote repo and update deployment settings on Vercel

---

## 🔄 WORKFLOW SUMMARY:

```
1. Copy repo → New folder
2. Gather all information
3. Fill in prompt template
4. Run in Claude Code
5. Review changes
6. Test locally
7. Create new remote repo
8. Push to remote
9. Deploy on Vercel
```

---

## 📝 EXAMPLE (filled in):

```
I need you to convert this car dealership website to a new dealership. Make all necessary changes throughout the codebase based on the following information:

**DEALERSHIP DETAILS:**
- Dealership Name: "Automóviles Quintana"
- Logo File Path: "/Users/alexis/Desktop/quintana-logo.png"
- Phone Number: "+34912345678"
- Email Address: "info@automovilesquintana.com"
- Street Address: "Calle Mayor 123, 2º A"
- City/Postal: "28013 Madrid, España"
- Google Maps Location URL: "https://www.google.com/maps/place/Calle+Mayor,+123,+28013+Madrid"
- Google Maps Embed URL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."

**BRANDING:**
- Primary Color (HSL format): "210 100% 50%"
- Primary Color Hex (for reference): "#0080FF"

**CONFIGURATION:**
- Profile ID: "abc123de-45f6-78g9-h012-ijklmnopqrst"
- Website Language: "es"
- Current Folder Name: "automovilesquintana"

**REQUIREMENTS:**
[... rest of requirements as listed above ...]
```

---

*Last Updated: 2025-10-28*
