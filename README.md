# Плагин Fun-Pack-Commands 🎉

Плагин `Fun-Pack-Commands` — это набор развлекательных и информационных команд для Minecraft, включая погоду, курсы криптовалют, статистику COVID-19, аниме, случайные факты, дату, время и подбрасывание монетки. Все команды настраиваемые! 🕹️

## ✨ Что это такое?
- **Назначение**: Добавляет разнообразные команды для развлечения и информации. 🎲
- **Гибкость**: Полная настройка сообщений и включение/выключение команд. ⚙️

## 🚀 Установка
1. Установите плагин через менеджер плагинов.
2. Настройте параметры, если требуется.

## 🎮 Команды и использование
Все команды доступны в чате, приватно или в клане. Каждая имеет свои права и задержку.

1. **@anime <название>** (или `@аниме`)
   - Показывает информацию об аниме через [Shikimori API](https://shikimori.one).
   - Пример: `@anime Лазарь` → "Аниме: Лазарь (Lazarus) | Тип: TV | Год: 2002 | Рейтинг: 7.9 | Эпизоды: Вышло (13)"
   - Право: `user.anime`, задержка: 15 сек.

2. **@coinflip** (или `@монетка`)
   - Подбрасывает монетку (орел или решка).
   - Пример: `@coinflip` → "Выпал орел!"
   - Право: `user.coinflip`, задержка: 5 сек.

3. **@covid <страна>** (или `@ковид`)
   - Показывает статистику COVID-19 по стране через [Disease.sh API](https://disease.sh).
   - Пример: `@covid Россия` → "Статистика для Россия: 10,000,000 случаев, 400,000 смертей, 9,500,000 выздоровело."
   - Право: `user.covid`, задержка: 10 сек.

4. **@crypto <тикер или название>** (или `@крипто`, `@курс`)
   - Показывает курс криптовалюты в USD и RUB через [CoinGecko API](https://www.coingecko.com).
   - Пример: `@crypto btc` → "Курс Bitcoin (BTC): $65,432.12 / 5,789,123.45 ₽"
   - Право: `user.crypto`, задержка: 5 сек.

5. **@currency <сумма> <из> <в>** (или `@валюта`)
   - Конвертирует валюту через [ЦБ РФ API](https://www.cbr-xml-daily.ru).
   - Пример: `@currency 100 USD EUR` → "100 USD = 92.45 EUR"
   - Право: `user.currency`, задержка: 10 сек.

6. **@date** (или `@дата`, `@data`)
   - Показывает текущую дату и праздники через [Nager.Date API](https://date.nager.at).
   - Пример: `@date` → "Сегодня пятница, 18 июля 2025. Праздник: День создания органов пожарного надзора!"
   - Право: `user.date`, задержка: 10 сек.

7. **@fact** (или `@факт`)
   - Показывает случайный факт с переводом на русский через [Numbers API](http://numbersapi.com) и Google Translate.
   - Пример: `@fact` → "Факт: Число 42 — это ответ на главный вопрос жизни, вселенной и всего остального."
   - Право: `user.fact`, задержка: 10 сек.

8. **@time [пояс]** (или `@время`)
   - Показывает время по МСК или указанному часовому поясу.
   - Пример: `@time` → "Текущее время (МСК (UTC+3)): 14 часов 30 минут 45 секунд"
   - Пример: `@time +5` → "Текущее время (UTC+5): 16 часов 30 минут 45 секунд"
   - Право: `user.time`, задержка: 5 сек.

9. **@weather <город>** (или `@погода`)
   - Показывает погоду в указанном городе через [Open-Meteo API](https://open-meteo.com).
   - Пример: `@weather Брест` → "Погода в городе Брест, Температура: 20°C (ощущается как 22°C), Погодные условия: дождь, Влажность: 83%, Ветер: 13.0 км/ч (порывы до 17.5 км/ч), Давление: 1015 гПа, UV-индекс: 0.4, Облачность: 100%, Видимость: 10 км"
   - Право: `user.weather`, задержка: 10 сек.

## ⚙️ Настройки
Каждая команда может быть включена/выключена и настроена:
- **Anime**:
  - `enableAnime`: Включить команду (по умолчанию: `true`).
  - `animeInfoMessage`: Формат ответа (по умолчанию: "Аниме: {name}{originalNameText} | Тип: {type} | Год: {year} | Рейтинг: {rating} | Эпизоды: {episodes}").
  - `animeNotFoundMessage`: Если аниме не найдено (по умолчанию: "Не удалось найти аниме по запросу: {query}").
- **Coinflip**:
  - `enableCoinflip`: Включить команду (по умолчанию: `true`).
  - `coinflipHeads`: Сообщение для орла (по умолчанию: "Выпал орел!").
  - `coinflipTails`: Сообщение для решки (по умолчанию: "Выпала решка!").
- **COVID**:
  - `enableCovid`: Включить команду (по умолчанию: `true`).
  - `covidSuccess`: Формат ответа (по умолчанию: "Статистика для {country}: {cases} случаев, {deaths} смертей, {recovered} выздоровело.").
  - `covidNotFound`: Если страна не найдена (по умолчанию: "Страна '{country}' не найдена.").
- **Crypto**:
  - `enableCrypto`: Включить команду (по умолчанию: `true`).
  - `cryptoSuccessMessage`: Формат ответа (по умолчанию: "Курс {name} ({symbol}): ${usd} / {rub} ₽").
  - `cryptoNotFoundMessage`: Если криптовалюта не найдена (по умолчанию: "Криптовалюта '{query}' не найдена.").
- **Currency**:
  - `enableCurrency`: Включить команду (по умолчанию: `true`).
  - `currencySuccess`: Формат ответа (по умолчанию: "{amount} {from} = {result} {to}").
  - `currencyInvalid`: При неверном формате (по умолчанию: "Неверный формат. Пример: @currency 100 USD EUR").
- **Date**:
  - `enableDate`: Включить команду (по умолчанию: `true`).
  - `dateWithHoliday`: Если есть праздник (по умолчанию: "Сегодня {date} Праздник: {holiday}!").
  - `dateWithoutHoliday`: Если праздника нет (по умолчанию: "Сегодня {date} Сегодня нет особых праздников.").
- **Fact**:
  - `enableFact`: Включить команду (по умолчанию: `true`).
  - `factMessage`: Формат ответа (по умолчанию: "Факт: {fact}").
- **Time**:
  - `enableTime`: Включить команду (по умолчанию: `true`).
  - `timeFormat`: Формат ответа (по умолчанию: "Текущее время ({timezone}): {time}").
  - `timeInvalidOffset`: При неверном поясе (по умолчанию: "Неверный формат. Укажите число от -12 до +12, например: +5 или -3.").
- **Weather**:
  - `enableWeather`: Включить команду (по умолчанию: `true`).
  - `weatherInfoMessage`: Формат ответа (по умолчанию: "Погода в городе {city}, Температура: {temp}°C (ощущается как {feelsLike}°C), Погодные условия: {description}, Влажность: {humidity}%, Ветер: {windSpeed} км/ч (порывы до {windGust} км/ч), Давление: {pressure} гПа, UV-индекс: {uv}, Облачность: {cloud}%, Видимость: {visibility} км").
  - `weatherNotFoundMessage`: Если город не найден (по умолчанию: "Не удалось найти такой город. Попробуй указать точное название.").
- `apiErrorMessage`: Общее сообщение об ошибке API (по умолчанию: "Не удалось получить данные от API. Попробуйте позже.").

## 🌐 Использование API
- **Shikimori API**: Для поиска аниме (`@anime`).
- **CoinGecko API**: Для курсов криптовалют (`@crypto`).
- **ЦБ РФ API**: Для конвертации валют (`@currency`).
- **Nager.Date API**: Для праздников (`@date`).
- **Numbers API**: Для случайных фактов (`@fact`).
- **Open-Meteo API**: Для погоды (`@weather`).
- **Disease.sh API**: Для статистики COVID-19 (`@covid`).
- **Примечание**: Все API бесплатны и не требуют ключей! 🎉

## 🎨 Дополнительно
- **Кэширование**: Курсы валют кэшируются на 1 час для оптимизации (`@currency`).
- **Логирование**: Все ошибки и успехи записываются в лог.
- **Форматирование**: Числовые данные (валюты, статистика) форматируются для читаемости.
