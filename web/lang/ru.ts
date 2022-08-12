export default async (_context: any, _locale: any) => {
  return await Promise.resolve({
    system: {
      now: 'настоящее время',
      year: 'год',
      years: 'года',
      yearss: 'лет',
      month: 'месяц',
      months: 'месяца',
      monthss: 'месяцев'
    },
    headers: {
      summary: "Резюме",
      knoweledge: "База знаний",
      reads: "Книги",
      languages: "Языки",
    },
    summary: {
      title: "Резюме",
      education: "Образование",
      courses: "Курсы",
      experience: "Опыт работы",
      skills: "Скиллы",
      tech_stack: "Технический стeк",
      achievements: "Достижения",
    },
    books: {
      read: "Прочитано",
      reading: "В процессе",
    },
  });
};
