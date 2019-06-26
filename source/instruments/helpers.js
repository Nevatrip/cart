export const getActualTime = (time, offset = 180) => {
  const timeOffset = new Date().getTimezoneOffset();

  /* Время на  бэкенде хранится в UTC. При создании объекта даты
  * он автоматически «наследует» локальный часовой пояс. Чтобы
  * сбросить его, добавляем к получившемуся времени это смещение
  * (`timeOffset`) и устанавливаем время часового пояса по умолчанию —
  * GTM +3, т. е. + 180 минут
  */
  time.setMinutes(time.getMinutes() + timeOffset + offset);

  return time;
}