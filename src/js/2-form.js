const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  if (!form) return;

  const { email, message } = form.elements;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      formData.email = saved.email ?? '';
      formData.message = saved.message ?? '';
    }
  } catch {}

  email.value = formData.email;
  message.value = formData.message;

  form.addEventListener('input', e => {
    const { name, value } = e.target;
    if (name in formData) {
      const clearValue = value.trim();
      formData[name] = clearValue;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const emailValid = formData.email.trim();
    const messageValid = formData.message.trim();

    if (!emailValid || !messageValid) {
      alert('Fill please all fields');
      return;
    }

    console.log(formData);

    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
    form.reset();
  });
});
