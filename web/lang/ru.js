export default async (context, locale) => {
  return await Promise.resolve({
    headers: {
      summary: "Резюме",
      knoweledge: "База знаний",
      reads: "Книги",
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
