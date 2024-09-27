export function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // Функция для отправки запроса на сервер
  async function searchQuery(query, offset, limit) {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${query}&offset=${offset}&limit=${limit}`
      );
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      const data = await res.json();
      console.log('Результаты поиска:', data); // Вывод результатов поиска в консоль
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  }
  
  // Привязываем обработчик ввода текста с debounce
  
  const input = document.querySelector('.search__input');
  input.addEventListener(
    'input',
    debounce(() => {
      const query = input.value.trim(); // Получаем текст из поля ввода
      if (query) {
        searchQuery(query); // Отправляем запрос на сервер
      }
    }, 300)
  );
  