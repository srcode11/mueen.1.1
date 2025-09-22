document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const messageBox = document.getElementById("formMessage");
      const inputs = form.querySelectorAll("input");
      let emptyFound = false;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          emptyFound = true;
        }
      });

      if (emptyFound) {
        e.preventDefault();
        messageBox.style.display = "block";
        messageBox.textContent =
          "⚠️ الرجاء تعبئة جميع الحقول قبل المتابعة";
      } else {
        messageBox.style.display = "none";
      }
    });
  });

  // ----------------------
  // Chat functionality
  // ----------------------
  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  if (chatWindow && userInput && sendBtn) {
    sendBtn.addEventListener("click", () => {
      const msg = userInput.value.trim();
      if (!msg) return;

      // User message
      const userBubble = document.createElement("div");
      userBubble.classList.add("chat-msg", "user");
      userBubble.innerHTML = `<div class="bubble">${msg}</div>`;
      chatWindow.appendChild(userBubble);
      userInput.value = "";
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Bot reply
      setTimeout(() => {
        const botBubble = document.createElement("div");
        botBubble.classList.add("chat-msg", "bot");
        botBubble.innerHTML = `<div class="bubble">تم استلام طلبك وسيتم الرد عليك فورًا!</div>`;
        chatWindow.appendChild(botBubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 800);
    });

    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  }
function understandArabicCommand(text) {
    text = text.toLowerCase();
    
    
    if (text.includes('طوارئ') || text.includes('اسعاف')) {
        return {
            action: 'redirect',
            page: 'emergency.html',
            message: 'أتوجه بك إلى صفحة الطوارئ الآن 🚑'
        };
    }
    else if (text.includes('وثائق') || text.includes('هوية')) {
        return {
            action: 'redirect', 
            page: 'id-card.html',
            message: 'أتوجه بك إلى تجديد الوثائق 📄'
        };
    }
    else if (text.includes('أين أنا') || text.includes('اين انا')) {
        return {
            action: 'describe',
            message: 'أنت الآن في الصفحة الرئيسية لتطبيق معينك. يمكنك طلب الطوارئ، تجديد الوثائق، أو المساعدة'
        };
    }
    
    return {
        action: 'ask',
        message: 'لم أفهم طلبك. هل تريد الطوارئ، الوثائق، أو المساعدة؟'
    };
}

function speakArabic(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}


let isListening = false;

function startArabicListening() {
    if (isListening) return;
    
    isListening = true;
    document.getElementById('arabic-message').textContent = "🎙️ أستمع إليك...";
    
    // محاكاة الاستماع (ستحتاجين خدمة حقيقية)
    setTimeout(() => {
        simulateArabicResponse();
        isListening = false;
    }, 3000);
}

function simulateArabicResponse() {
    
    const responses = [
        "تم فهم طلبك، أتوجه بك إلى صفحة الطوارئ",
        "أسعفني - توجيه إلى خدمات الإسعاف", 
        "أريد تجديد الهوية - توجيه إلى تجديد الوثائق",
        "أين أنا - أنت في الصفحة الرئيسية",
        "احتاج مساعدة - سيتم توجيهك الى الاسعاف"
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    document.getElementById('arabic-message').textContent = randomResponse;
    speakArabic(randomResponse);
}


async function processArabicVoice(audioBlob) {
    
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', 'ar');
    
    const response = await fetch('https://api.arabic-speech-to-text.com/recognize', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    return result.text;
}
  // ----------------------
  // Splash screen
  // ----------------------
  const splash = document.getElementById("splash");
  if (splash) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        splash.classList.add("fade-out");
      }, 1800); // wait 1.8s before hiding
    });
  }

  // ----------------------
  // Quotes slider
  // ----------------------
  const quotes = document.querySelectorAll(".quote");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function showQuote(i) {
    quotes.forEach((q, idx) => {
      q.classList.toggle("active", idx === i);
      if (dots[idx]) dots[idx].classList.toggle("active", idx === i);
    });
  }

  if (quotes.length > 0) {
    setInterval(() => {
      index = (index + 1) % quotes.length;
      showQuote(index);
    }, 2000); // يتغير كل ثانيتين
  }

  // ----------------------
  // Search filter for nav-boxes (homepage)
  // ----------------------
  const navSearchInput = document.getElementById("navSearch");
  const navBoxes = document.querySelectorAll(".nav-box");

  if (navSearchInput) {
    navSearchInput.addEventListener("input", () => {
      const query = navSearchInput.value.trim().toLowerCase();

      navBoxes.forEach((box) => {
        const title = box.querySelector(".nav-box-title").textContent.toLowerCase();
        box.style.display = title.includes(query) || query === "" ? "flex" : "none";
      });
    });
  }

  // ----------------------
  // Search filter for messages (messages.html)
  // ----------------------
  const msgSearchInput = document.getElementById("msgSearch");
  const messages = document.querySelectorAll(".message-item");

  if (msgSearchInput) {
    msgSearchInput.addEventListener("input", () => {
      const query = msgSearchInput.value.trim().toLowerCase();

      messages.forEach((msg) => {
        const name = msg.querySelector(".msg-name").textContent.toLowerCase();
        const text = msg.querySelector(".msg-text").textContent.toLowerCase();

        msg.style.display =
          name.includes(query) || text.includes(query) || query === "" ? "block" : "none";
      });
    });
  }

  // ----------------------
  // Emergency popup (call confirm)
  // ----------------------
  window.showPopup = function(number) {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup-text").innerText = `هل تريد الاتصال بالرقم ${number}؟`;
    document.getElementById("call-btn").setAttribute("href", `tel:${number}`);
  };

  window.closePopup = function() {
    document.getElementById("popup").style.display = "none";
  };
  
  // ----------------------
// Inquiries form (limit 500 chars + confirm send)
// ----------------------
const inquiryForm = document.getElementById("contactForm");
const inquiryMsgBox = document.getElementById("formMessage");
const inquiryPopup = document.getElementById("popup");
const confirmSend = document.getElementById("confirmSend");
const inquiryMessage = document.getElementById("message");
const charCount = document.getElementById("charCount");

if (inquiryForm && inquiryMessage && charCount) {
  const maxChars = 500;

  inquiryMessage.addEventListener("input", () => {
    let length = inquiryMessage.value.length;

    // قطع النص عند 500 بالضبط
    if (length > maxChars) {
      inquiryMessage.value = inquiryMessage.value.substring(0, maxChars);
      length = maxChars;
    }

    charCount.textContent = `${length}/${maxChars}`;

    charCount.style.color = length === maxChars ? "red" : "#333";
  });

  inquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = inquiryMessage.value.trim();

    if (!name || !email || !msg) {
      inquiryMsgBox.style.display = "block";
      inquiryMsgBox.textContent = "⚠️ الرجاء تعبئة جميع الحقول قبل المتابعة";
      return;
    }

    inquiryMsgBox.style.display = "none";
    inquiryPopup.style.display = "flex"; // show popup
  });

  if (confirmSend) {
    confirmSend.addEventListener("click", () => {
      inquiryPopup.style.display = "none";
      alert("✅ تم إرسال استعلامك بنجاح!");
      inquiryForm.reset();
      charCount.textContent = `0/${maxChars}`;
      charCount.style.color = "#333";
    });
  }
}


// ----------------------
// Font size (global + settings)
// ----------------------
const fontRange = document.getElementById("fontRange");

window.addEventListener("load", () => {
  const savedOffset = localStorage.getItem("fontOffset");
  if (savedOffset !== null) {
    document.documentElement.style.setProperty("--font-offset", savedOffset + "px");

    if (fontRange) {
      fontRange.value = savedOffset;
    }
  }
});

if (fontRange) {
  fontRange.addEventListener("input", function() {
    document.documentElement.style.setProperty("--font-offset", this.value + "px");
    localStorage.setItem("fontOffset", this.value);
  });
}

// ----------------------
// Service form validation + popup
// ----------------------
const serviceForm = document.querySelector(".service-form");
const messageBox = document.getElementById("formMessage");
const servicePopup = document.getElementById("popup");
const confirmSendBtn = document.getElementById("confirmSend");

if (serviceForm) {
  serviceForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const fullName = document.getElementById("full-name").value.trim();
    const nationalId = document.getElementById("national-id").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value.trim();
    const date = document.getElementById("date").value.trim();

    if (!fullName || !nationalId || !phone || !service || !date) {
      messageBox.style.display = "block";
      messageBox.textContent = "⚠️ الرجاء تعبئة جميع الحقول قبل المتابعة";
      return;
    }

    const idRegex = /^\d{10}$/;
    if (!idRegex.test(nationalId)) {
      messageBox.style.display = "block";
      messageBox.textContent = "⚠️ رقم الهوية يجب أن يتكون من 10 أرقام صحيحة";
      return;
    }

    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phone)) {
      messageBox.style.display = "block";
      messageBox.textContent = "⚠️ رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
      return;
    }

    messageBox.style.display = "none";
    servicePopup.style.display = "flex"; 
  });

  if (confirmSendBtn) {
    confirmSendBtn.addEventListener("click", () => {
      servicePopup.style.display = "none";
      alert("✅ تم إرسال الطلب بنجاح!");
      serviceForm.reset();
    });
  }
}

// ----------------------
// Support form validation + popup
// ----------------------
const supportForm = document.querySelector(".support-form");
const supportMsgBox = document.getElementById("formMessage");
const supportPopup = document.getElementById("popup");
const supportConfirmBtn = document.getElementById("confirmSend");

if (supportForm) {
  supportForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("full-name").value.trim();
    const nationalId = document.getElementById("national-id").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const disability = document.getElementById("disability").value.trim();
    const support = document.getElementById("support").value.trim();
    const file = document.getElementById("file").value.trim();

    if (!fullName || !nationalId || !phone || !disability || !support || !file) {
      supportMsgBox.style.display = "block";
      supportMsgBox.textContent = "⚠️ الرجاء تعبئة جميع الحقول (ما عدا الملاحظات) قبل المتابعة";
      return;
    }

    const idRegex = /^\d{10}$/;
    if (!idRegex.test(nationalId)) {
      supportMsgBox.style.display = "block";
      supportMsgBox.textContent = "⚠️ رقم الهوية يجب أن يتكون من 10 أرقام صحيحة";
      return;
    }

    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phone)) {
      supportMsgBox.style.display = "block";
      supportMsgBox.textContent = "⚠️ رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
      return;
    }

    supportMsgBox.style.display = "none";
    supportPopup.style.display = "flex"; 
  });

  if (supportConfirmBtn) {
    supportConfirmBtn.addEventListener("click", () => {
      supportPopup.style.display = "none";
      alert("✅ تم إرسال الطلب بنجاح!");
      supportForm.reset();
    });
  }
}


// ----------------------
// Dark Mode toggle
// ----------------------
const darkModeToggle = document.getElementById("darkMode");

window.addEventListener("load", () => {
  const darkPref = localStorage.getItem("darkMode");
  if (darkPref === "enabled") {
    document.body.classList.add("dark");
    if (darkModeToggle) darkModeToggle.checked = true;
  }
});

if (darkModeToggle) {
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}


});


