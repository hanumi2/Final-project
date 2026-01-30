import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        dashboard: "Dashboard",
        projectRequest: "Project Request",
        planOfArgument: "Plan of Argument (Mandatory)",
        lease: "Lease (Optional)",
        submit: "Submit Request",
        status: "Status",
        chat: "Live Chat",
        notifications: "Notifications",
        aiGuide: "AI Assistant",
        profile: "My Profile",
        logout: "Logout",
        welcome: "Welcome back",
        uploadSuccess: "Project request submitted successfully!",
        waitingApproval: "Waiting for PM approval",
        paymentRequired: "Upload prepayment screenshot",
        blueprintReady: "Final Blueprint ready for download",
    },
    am: {
        dashboard: "ዳሽቦርድ",
        projectRequest: "የፕሮጀክት ጥያቄ",
        planOfArgument: "የጥንቆላ እቅድ (ግዴታ)",
        lease: "የሊዝ ውል (አማራጭ)",
        submit: "ጥያቄውን ላክ",
        status: "ሁኔታ",
        chat: "ውይይት",
        notifications: "ማሳወቂያዎች",
        aiGuide: "የAI ረዳት",
        profile: "መገለጫዬ",
        logout: "ውጣ",
        welcome: "እንኳን ደህና መጡ",
        uploadSuccess: "የፕሮጀክት ጥያቄ በተሳካ ሁኔታ ቀርቧል!",
        waitingApproval: "የPM እውቅና በመጠበቅ ላይ",
        paymentRequired: "የቅድመ ክፍያ ደረሰኝ ይላኩ",
        blueprintReady: "የመጨረሻው ብሉፕሪንት ለመውረድ ዝግጁ ነው",
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

    const switchLang = (l) => {
        setLang(l);
        localStorage.setItem('lang', l);
    };

    const t = (key) => translations[lang][key] || key;

    return (
        <LanguageContext.Provider value={{ lang, switchLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
