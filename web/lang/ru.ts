export default async (_context: any, _locale: any) => {
  return await Promise.resolve({
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
