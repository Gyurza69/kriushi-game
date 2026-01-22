// ============================================
// ДАННЫЕ СЦЕН - ЗАПОЛНИ ЭТОТ МАССИВ
// ============================================
const SCENES = [
  {
  id: "s1_home",
  title: "Криуши. Дом Сергея",
  background: "home",
  text:
    "Телевизор орёт на кухне. Канал не ловит — только шум и обрывки голосов.\n" +
    "Сергей сидит в куртке. В доме холодно, хотя печь топили днём.\n\n" +

    "За окном — тьма. На всю улицу горит один фонарь. Он мигает, будто считает секунды.\n" +
    "Где-то во дворах лают собаки. Сначала одна. Потом ещё. Потом сразу несколько.\n\n" +

    "Сергей встаёт и подходит к окну.\n" +
    "На снегу — следы. Свежие. Не его.\n\n" +

    "На столе рюкзак. Тетради для учёбы. Документы.\n" +
    "Если выйти сейчас — можно успеть выбраться.\n\n" +

    "Телефон вибрирует.\n" +
    "Сообщение от брата:\n" +
    "«Серый, меня завтра забирают. Говорят — надолго. Если можешь — уезжай отсюда.»\n\n" +

    "Телевизор внезапно замолкает.\n" +
    "В доме становится слишком тихо.\n\n" +

    "Сергей смотрит на дверь.\n" +
    "Он понимает: если замешкается — Криуши решат за него.",
  options: [
    {
      text: "Взять фонарик со стола",
      next: "s2_street",
      effects: { addItem: "Фонарик", stress: -3 }
    },
    {
      text: "Взять нож",
      next: "s2_street",
      effects: { addItem: "Нож", stress: +1 }
    },
    {
      text: "Ответить брату: «Держись»",
      next: "s2_street",
      effects: { setFlag: "textedDima", stress: +7 }
    },
    {
      text: "Выйти сразу, не включая свет",
      next: "s2_street",
      effects: { stress: +6, setFlag: "leftInHurry" }
    }
  ],
  onTimeout: {
    next: "s2_street",
    effects: { stress: +10, setFlag: "hesitatedAtStart" }
  }
  },

  {
    id: "s2_street",
    title: "Улица Криушей",
    background: "street",
    text:
      "Один фонарь на всю улицу мигает, как будто вот-вот погаснет. Между домами — тёмные провалы.\n" +
      "Где-то во дворах лают собаки. Ветер режет лицо.",
    options: [
      { text: "Идти по свету, не срезая", next: "s3_danil_or_yard", effects: { stress: +2 } },
      { text: "Срезать дворами (быстрее)", next: "s4_yard_blood", effects: { stress: +6 } },
      { text: "Зайти к Данилу Ражетдинову", next: "s3_danil", effects: { stress: -1 } }
    ],
  },

  {
    id: "s3_danil",
    title: "Данил Ражетдинов",
    background: "houseWarm",
    text:
      "Данил открывает дверь почти сразу. Добрый, усталый взгляд.\n" +
      "— Сергей, ты куда в такую ночь? Тут нынче… нехорошо.\n" +
      "В доме тепло. От этого хочется остаться. Но нельзя.",
    options: [
      { text: "Попросить помочь (совет + вещь)", next: "s3_danil_help", effects: { stress: -6, setFlag: "metDanil" } },
      { text: "Поблагодарить и уйти", next: "s3_danil_or_yard", effects: { stress: -2, setFlag: "metDanil" } }
    ],
  },

  {
    id: "s3_danil_help",
    title: "Данил помогает",
    background: "houseWarm",
    text:
      "Данил вздыхает, как будто выбирает между страхом и совестью.\n" +
      "— Иди к остановке через свет, не лезь во дворы. И… держи.\n" +
      "Он протягивает вещь.",
    options: [
      {
        text: "Взять тёплые варежки (успокаивает)",
        next: "s3_danil_or_yard",
        effects: { addItem: "Варежки", stress: -4, setFlag: "gotGloves" }
      },
      {
        text: "Взять запасную зажигалку (свет/шанс отпугнуть)",
        next: "s3_danil_or_yard",
        effects: { addItem: "Зажигалка", stress: -2, setFlag: "gotLighter" }
      },
      {
        text: "Не брать ничего (не хочу быть должен)",
        next: "s3_danil_or_yard",
        effects: { stress: +2 }
      }
    ],
  },

  {
    id: "s3_danil_or_yard",
    title: "Дальше по улице",
    background: "street",
    text:
      "Снег хрустит под ногами. Свет впереди кажется далёким.\n" +
      "Сергей старается не смотреть в тёмные окна.",
    options: [
      { text: "Идти к магазину и остановке", next: "s5_shop", effects: { stress: +3 } },
      { text: "Проверить дворы по пути (опасно)", next: "s4_yard_blood", effects: { stress: +5 } }
    ],
  },

  {
    id: "s4_yard_blood",
    title: "Двор. Хлев",
    background: "yard",
    text:
      "Во дворе пахнет железом и сырым сеном. Дверь хлева приоткрыта.\n" +
      "На снегу — тёмные пятна. Слишком свежие.",
    options: [
      { text: "Заглянуть внутрь", next: "s4_inside", effects: { stress: +10, setFlag: "sawSlaughter" } },
      { text: "Уйти быстро и молча", next: "s5_shop", effects: { stress: +4 } },
      { text: "Позвать хозяина", next: "s4_mezin", effects: { stress: +6 } }
    ],
  },

  {
    id: "s4_inside",
    title: "Внутри хлева",
    background: "barn",
    text:
      "Внутри — пусто. Разорванные мешки. Следы волочения.\n" +
      "Это не кража мяса. Это будто… показательная порча.\n" +
      "Снаружи раздаётся кашель.",
    options: [
      { text: "Выйти и сделать вид, что ничего не видел", next: "s5_shop", effects: { stress: +4 } },
      { text: "Спрятаться за дверью и подождать", next: "s4_mezin", effects: { stress: +6 } }
    ],
  },

  {
    id: "s4_mezin",
    title: "Андрей Мезин",
    background: "yard",
    text:
      "Андрей Мезин качается у забора, пахнет спиртом. Глаза красные.\n" +
      "— Не первые… — бормочет он. — Тут теперь… свои правила.\n" +
      "Он смотрит куда-то в темноту и усмехается.",
    options: [
      { text: "Спросить: «Кто это сделал?»", next: "s4_mezin_info", effects: { stress: +2 } },
      { text: "Сказать: «Идите домой» и уйти", next: "s5_shop", effects: { stress: +3 } },
      { text: "Тихо уйти, не споря", next: "s5_shop", effects: { stress: +1 } }
    ],
  },

  {
    id: "s4_mezin_info",
    title: "Слухи Мезина",
    background: "yard",
    text:
      "— Головешкин… — произносит он и хохочет. — Думаешь, они только деньги берут?\n" +
      "Он громко сплёвывает и вдруг повышает голос:\n" +
      "— Вон они! Они всё слышат!",
    options: [
      { text: "Заткнуть его: «Тише!»", next: "s5_shop", effects: { stress: +7, setFlag: "mezinDrewAttention" } },
      { text: "Схватить и увести в сторону", next: "s5_shop", effects: { stress: +6 } },
      { text: "Бросить и уйти", next: "s5_shop", effects: { stress: +4 } }
    ],
  },

  {
    id: "s5_shop",
    title: "Магазин. Свет",
    background: "shop",
    text:
      "У магазина светлее. Под фонарём стоят Олег Головешкин и дружки.\n" +
      "Олег улыбается так, будто заранее знает, что ты сделаешь.\n" +
      "— Сергей… студент. Куда собрался? В город? — он приближается.",
    options: [
      { text: "Сказать спокойно: «На учёбу. Мне надо.»", next: "s5_oleg_talk", effects: { stress: +3 } },
      { text: "Солгать: «К Диме. Провожаю.»", next: "s5_oleg_lie", effects: { stress: +4 } },
      { text: "Отдать часть денег, лишь бы пропустили", next: "s5_oleg_pay", effects: { money: -500, stress: -2, setFlag: "paidOleg" } },
      { text: "Развернуться и уйти дворами", next: "s6_dogs", effects: { stress: +6 } }
    ],
  },

  {
    id: "s5_oleg_pay",
    title: "Дань",
    background: "shop",
    text:
      "Олег берёт деньги неспешно, будто это не деньги, а расписание этой деревни.\n" +
      "— Вот так бы сразу. Иди, студент.\n" +
      "Дружки смеются. Тебя пропускают.",
    options: [
      { text: "Идти к остановке", next: "s7_stop", effects: { stress: +2 } }
    ],
  },

  {
    id: "s5_oleg_talk",
    title: "Разговор с Олегом",
    background: "shop",
    text:
      "— Надо… — Олег повторяет твоё слово, как насмешку.\n" +
      "— А мне тоже много чего надо. Ты понимаешь, Сергей?\n" +
      "Он ждёт реакции.",
    options: [
      { text: "Не спорить и предложить 300 рублей", next: "s5_oleg_pay_small", effects: { money: -300, stress: -1, setFlag: "paidOleg" } },
      { text: "Попробовать пройти мимо молча", next: "s5_oleg_block", effects: { stress: +8 } },
      { text: "Если есть нож — показать, но не угрожать", next: "s5_oleg_knife", requires: { item: "Нож" }, effects: { stress: +12, setFlag: "angeredOleg" } }
    ],
  },

  {
    id: "s5_oleg_lie",
    title: "Ложь",
    background: "shop",
    text:
      "— Провожаешь? — Олег щурится.\n" +
      "— Диму завтра забирают. Мы все знаем. И ты это знаешь.\n" +
      "Он улыбается шире. Ложь не прошла.",
    options: [
      { text: "Отдать 500 рублей и уйти", next: "s5_oleg_pay", effects: { money: -500, stress: +1, setFlag: "paidOleg" } },
      { text: "Развернуться и уйти дворами", next: "s6_dogs", effects: { stress: +8, setFlag: "angeredOleg" } }
    ],
  },

  {
    id: "s5_oleg_pay_small",
    title: "Мелкая дань",
    background: "shop",
    text:
      "Олег берет деньги и будто бы разочарован.\n" +
      "— Ладно. Сегодня так.\n" +
      "Дружки переглядываются: кажется, тебя запомнили.",
    options: [
      { text: "Идти к остановке", next: "s7_stop", effects: { stress: +3, setFlag: "notedByOleg" } }
    ],
  },

  {
    id: "s5_oleg_block",
    title: "Не пропускают",
    background: "shop",
    text:
      "Олег делает шаг и перекрывает путь.\n" +
      "— Ты куда, Сергей?\n" +
      "Слишком близко стоят его дружки. В этой темноте это не спор, это ловушка.",
    options: [
      { text: "Заплатить 500 рублей", next: "s5_oleg_pay", effects: { money: -500, stress: +2, setFlag: "paidOleg" } },
      { text: "Резко уйти дворами", next: "s6_dogs", effects: { stress: +10, setFlag: "angeredOleg" } }
    ],
  },

  {
    id: "s5_oleg_knife",
    title: "Нож — плохая идея",
    background: "shop",
    text:
      "Ты показываешь нож — не угрожая, просто как факт.\n" +
      "Олег даже не моргает.\n" +
      "— Ты смелый… — говорит он тихо. — Или глупый.\n" +
      "Дружки смеются. Теперь точно всё стало хуже.",
    options: [
      { text: "Спрятать нож и заплатить", next: "s5_oleg_pay", effects: { money: -500, stress: +8, setFlag: "angeredOleg" } },
      { text: "Уйти дворами немедленно", next: "s6_dogs", effects: { stress: +14, setFlag: "angeredOleg" } }
    ],
  },

  {
    id: "s6_dogs",
    title: "Стая",
    background: "dark",
    text:
      "Во дворах темнее. Снег тут рыхлый, шаги громкие.\n" +
      "Лай становится ближе. Сразу несколько голосов.\n" +
      "Ты понимаешь: это не одна собака. Это стая.",
    options: [
      { text: "Бежать!", next: "minigame_chase", effects: { stress: +6 } },
      { text: "Если есть зажигалка — зажечь", next: "s6_dogs_fire", requires: { item: "Зажигалка" }, effects: { stress: -2 } },
      { text: "Замереть и прислушаться", next: "s6_dogs_freeze", effects: { stress: +10 } }
    ],
  },

  {
    id: "s6_dogs_fire",
    title: "Огонёк",
    background: "dark",
    text:
      "Ты щёлкаешь зажигалкой. Маленький огонь дрожит на ветру.\n" +
      "Лай на секунду стихает, будто стая решает.\n" +
      "Но огня мало. Надо двигаться.",
    options: [
      { text: "Рвануть к свету", next: "minigame_chase", effects: { stress: +3 } },
      { text: "Идти осторожно, не бежать", next: "s7_stop", effects: { stress: +6 } }
    ],
  },

  {
    id: "s6_dogs_freeze",
    title: "Плохой выбор",
    background: "dark",
    text:
      "Ты замираешь. Тишина длится слишком долго.\n" +
      "А потом из темноты — хруст снега. Слишком близко.\n" +
      "Тебя замечают.",
    options: [
      { text: "Срываться с места!", next: "minigame_chase", effects: { stress: +12 } }
    ],
  },

  // TODO: заменить на полноценную мини-игру
  {
    id: "minigame_chase",
    title: "Погоня",
    background: "dark",
    text:
      "Ты бежишь. Снег под ногами проваливается, дыхание сбивается.\n" +
      "Лай всё ближе. Тени мелькают по бокам.\n" +
      "Впереди — просвет. Нужно успеть.",
    options: [
      { text: "Рвануть изо всех сил", next: "s7_stop", effects: { stress: +4 } },
      { text: "Петлять между заборами", next: "s7_stop", effects: { stress: +6 } },
      { text: "Споткнуться и упасть", next: "s7_stop_bad", effects: { stress: +12 }, hesitate: true }
    ],
  },

  {
    id: "s7_stop",
    title: "Остановка",
    background: "stop",
    text:
      "Остановка занесена снегом. Табличка с расписанием сорвана.\n" +
      "Автобуса нет. Связь ловит через раз.\n" +
      "Ты думаешь о Диме: завтра его увезут, а ты… ты пытаешься успеть к своей жизни.",
    options: [
      { text: "Позвонить Диме (если решишься)", next: "s8_call_dima", effects: { stress: +4, setFlag: "calledDima" } },
      { text: "Идти пешком к трассе", next: "s9_road", effects: { stress: +6 } },
      { text: "Ждать 5 минут (вдруг автобус)", next: "s7_wait", effects: { stress: +8 } }
    ],
  },

  {
    id: "s7_stop_bad",
    title: "Остановка. После погони",
    background: "stop",
    text:
      "Ты вылетаешь к остановке на адреналине. Где-то сзади — лай.\n" +
      "Ноги дрожат. Кажется, рукав порван.\n" +
      "Автобуса всё равно нет.",
    options: [
      { text: "Идти к трассе, не оглядываясь", next: "s9_road", effects: { stress: +10, setFlag: "injuredByDogs" } },
      { text: "Позвонить Диме", next: "s8_call_dima", effects: { stress: +8, setFlag: "calledDima" } }
    ],
  },

  {
    id: "s7_wait",
    title: "Ожидание",
    background: "stop",
    text:
      "Пять минут тянутся как час. Вдали кто-то смеётся.\n" +
      "Тени движутся между домами. Здесь нельзя стоять долго.",
    options: [
      { text: "Идти к трассе", next: "s9_road", effects: { stress: +8 } },
      { text: "Вернуться к свету у магазина", next: "s5_shop", effects: { stress: +6 } }
    ],
  },

  {
    id: "s8_call_dima",
    title: "Звонок брату",
    background: "stop",
    text:
      "Гудки. Сигнал прыгает.\n" +
      "— Серый? — голос Димы звучит глухо. — Меня завтра… ну ты понял.\n" +
      "Вы молчите секунду. Слова как лёд.\n" +
      "— Учись там. Не возвращайся сюда, — говорит он.",
    options: [
      { text: "«Держись. Я вытащу тебя.»", next: "s9_road", effects: { stress: +2, setFlag: "promisedHelp" } },
      { text: "«Прости…»", next: "s9_road", effects: { stress: +6 } },
      { text: "Сбросить (не выдержал)", next: "s9_road", effects: { stress: +10 } }
    ],
  },

  {
    id: "s9_road",
    title: "Трасса",
    background: "road",
    text:
      "Трасса темнее, чем должна быть. Фары появляются внезапно.\n" +
      "Машина замедляется. Ты не понимаешь — это шанс или беда.\n" +
      "Сергей чувствует, как в деревне всё решается не словами.",
    options: [
      { text: "Выйти на свет и махать", next: "s10_car", effects: { stress: +6 } },
      { text: "Спрятаться в кювет и посмотреть, кто это", next: "s10_peek", effects: { stress: +4 } },
      { text: "Если есть деньги — вызвать такси (условно)", next: "s10_taxi", effects: { money: -1200, stress: -2 }, requires: { moneyAtLeast: 1200 } }
    ],
  },

  {
    id: "s10_taxi",
    title: "Такси",
    background: "road",
    text:
      "Ты пишешь коротко, где стоишь. Машина подъезжает минут через пять.\n" +
      "Водитель не задаёт вопросов. Ты садишься, хлопаешь дверью и впервые за ночь дышишь ровнее.",
    options: [
      { text: "Уехать", next: "end_good", effects: { setFlag: "leftByTaxi" } }
    ],
  },

  {
    id: "s10_peek",
    title: "Кто в машине?",
    background: "road",
    text:
      "Ты прячешься в снегу у обочины. Машина останавливается чуть дальше.\n" +
      "Из неё выходит силуэт. Слышен смех. Второй силуэт.\n" +
      "Слишком знакомо. Похоже на Головешкина.",
    options: [
      { text: "Тихо отойти назад, в темноту", next: "end_bad", effects: { stress: +12, setFlag: "caughtNearRoad" } },
      { text: "Резко выбежать на другую сторону трассы", next: "s10_run_road", effects: { stress: +14 } }
    ],
  },

  {
    id: "s10_run_road",
    title: "Рывок",
    background: "road",
    text:
      "Ты срываешься с места. Снег скользкий, ноги подламываются.\n" +
      "Фары бьют в глаза. Слышишь: «Эй!»\n" +
      "Всё решает секунда.",
    options: [
      { text: "Бежать не останавливаясь", next: "end_good_check", effects: { stress: +10 } },
      { text: "Спрятаться за отбойник", next: "end_bad", effects: { stress: +8 } }
    ],
  },

  {
    id: "s10_car",
    title: "Машина остановилась",
    background: "road",
    text:
      "Ты выходишь на свет и машешь.\n" +
      "Окно приоткрывается. Внутри — водитель. Лицо усталое.\n" +
      "— Ты откуда здесь? — спрашивает он. — В такую ночь…",
    options: [
      { text: "Сказать правду: «Хочу уехать. На учёбу. В деревне опасно.»", next: "end_good_check", effects: { stress: +4 } },
      { text: "Сказать коротко: «До города. Заплачу.»", next: "end_good_check", effects: { stress: +2 } },
      { text: "Если стресс высокий — начать путаться и молчать", next: "end_bad", effects: { stress: +6 } }
    ],
  },

  {
    id: "end_good_check",
    title: "Последний шанс",
    background: "road",
    text:
      "Ты понимаешь: если сейчас сорвёшься — останешься в Криушах.\n" +
      "Снег липнет к обуви. В голове — Дима, учёба, город.\n" +
      "Тебе нужно удержаться.",
    options: [
      { text: "Собраться и сесть в машину", next: "end_good", effects: {} },
      { text: "Обернуться на деревню (на секунду)", next: "end_bad", effects: { stress: +10 } }
    ],
  },

  {
    id: "end_good",
    title: "Финал: город",
    background: "endGood",
    ending: "good",
    text:
      "Машина трогается. Криуши остаются позади.\n" +
      "В зеркале ты видишь один мигающий фонарь — и он гаснет.\n" +
      "Телефон оживает на секунду: сообщение от Димы — «Держись».\n" +
      "Ты не знаешь, спасся ли. Но ты выбрался.",
    options: [
      { text: "Начать заново", next: "s1_home", effects: { reset: true } }
    ]
  },

  {
    id: "end_bad",
    title: "Финал: Криуши",
    background: "endBad",
    ending: "bad",
    text:
      "Ты возвращаешься обратно — сам не понимаешь как.\n" +
      "В деревне всё так же холодно и темно. Лай уже не пугает — он как фон.\n" +
      "Утром за Димой приезжают. Ты смотришь в окно и молчишь.\n" +
      "Криуши не отпускают тех, кто сомневается.",
    options: [
      { text: "Начать заново", next: "s1_home", effects: { reset: true } }
    ]
  },

  {
    id: "ending_stress",
    title: "Финал: Сломался",
    background: "endBad",
    ending: "bad",
    text:
      "Слишком много. Слишком быстро. Ты не выдерживаешь.\n" +
      "Ноги подкашиваются, руки дрожат. Всё вокруг расплывается.\n" +
      "Ты садишься прямо в снег и понимаешь — дальше идти не можешь.\n" +
      "Криуши забирают тех, кто сдаётся.",
    options: [
      { text: "Начать заново", next: "s1_home", effects: { reset: true } }
    ]
  },

  {
    id: "ending_money",
    title: "Финал: Без гроша",
    background: "endBad",
    ending: "bad",
    text:
      "Денег больше нет. Совсем.\n" +
      "Ни на автобус, ни на такси, ни откупиться.\n" +
      "Ты стоишь посреди ночной деревни с пустыми карманами.\n" +
      "В Криушах без денег не выжить.",
    options: [
      { text: "Начать заново", next: "s1_home", effects: { reset: true } }
    ]
  }
];

// ============================================
// ПРЕДМЕТЫ (иконка -> название для статистики)
// ============================================
const ITEMS = {
    "🔑": "Ключ",
    "📱": "Телефон",
    "💊": "Таблетки",
    "🔦": "Фонарик",
    "🍞": "Еда",
    "🎫": "Билет",
    "📄": "Документы",
    "💳": "Карта"
};

// ============================================
// ФОНЫ СЦЕН (background → путь к файлу)
// ============================================
const BACKGROUNDS = {
    "home": "backgrounds/home.jpg",
    "street": "backgrounds/street.jpg",
    "houseWarm": "backgrounds/houseWarm.jpg",
    "yard": "backgrounds/yard.jpg",
    "barn": "backgrounds/barn.jpg",
    "shop": "backgrounds/shop.jpg",
    "dark": "backgrounds/dark.jpg",
    "stop": "backgrounds/stop.jpg",
    "road": "backgrounds/road.jpg",
    "endGood": "backgrounds/end_good.jpg",
    "endBad": "backgrounds/end_bad.jpg"
};

// ============================================
// ЗВУКОВОЙ МЕНЕДЖЕР (WebAudio) — DRONE + МОДУЛЯЦИЯ
// ============================================
class SoundManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.isEnabled = false;
        this.volume = 0.5;
        this.initialized = false;

        // Активные звуки
        this.windNodes = null;
        this.tvNodes = null;
        this.dogsInterval = null;
        this.dogsFrequency = 15000;

        // === DRONE СИСТЕМА ===
        this.droneNodes = null;      // Постоянный гул
        this.droneGain = null;       // Громкость дрона
        this.droneLFO = null;        // Медленное колебание
        this.surgeTimeout = null;    // Таймер всплесков
        this.reverbNode = null;
        this.currentSceneId = 's1_home';

        // Определяем мобильное устройство
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // === ПАРАМЕТРЫ СТРАХА ===
        // На мобильных поднимаем частоты (динамики телефона не воспроизводят <100 Hz)
        this.FEAR = {
            // DRONE
            droneFreq: this.isMobile ? 110 : 55,           // Основная частота
            droneHarmonicFreq: this.isMobile ? 220 : 140,  // Гармоника
            droneVolume: this.isMobile ? 0.15 : 0.08,      // Громкость (выше на мобильных)
            droneHarmonicVol: this.isMobile ? 0.10 : 0.04, // Громкость гармоники
            droneLFOSpeed: 0.08,     // Скорость колебания
            droneLFODepth: 0.4,      // Глубина колебания

            // ВСПЛЕСКИ
            surgeMinInterval: 8000,
            surgeMaxInterval: 25000,
            surgeVolume: this.isMobile ? 0.25 : 0.15,      // Громче на мобильных
            surgeDetune: 35,
            surgeDissonance: 0.6,
            surgeDuration: 4,
        };

        console.log('[SOUND] Mobile:', this.isMobile, 'Drone freq:', this.FEAR.droneFreq);

        // UI элементы
        this.toggleBtn = document.getElementById('soundToggle');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.soundHint = document.getElementById('soundHint');
        this.unlocked = false;

        // Универсальный обработчик для touch и click
        const addTouchHandler = (element, callback) => {
            if (!element) return;

            let touched = false;

            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                touched = true;
                callback();
                // Сбрасываем флаг через небольшую задержку
                setTimeout(() => { touched = false; }, 300);
            }, { passive: false });

            element.addEventListener('click', (e) => {
                // Игнорируем click если был touch
                if (touched) return;
                callback();
            });
        };

        // Кнопка звука
        addTouchHandler(this.toggleBtn, () => this.toggle());

        // Подсказка
        addTouchHandler(this.soundHint, () => {
            if (!this.isEnabled) this.toggle();
        });

        // Слайдер громкости
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', () => {
                this.setVolume(this.volumeSlider.value / 100);
            });
        }
    }

    // Инициализация — создаём AudioContext (должна вызываться из обработчика события!)
    init() {
        if (this.ctx) return;

        // iOS Safari требует webkit prefix
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.volume;
        this.masterGain.connect(this.ctx.destination);

        // Gain для дрона
        this.droneGain = this.ctx.createGain();
        this.droneGain.gain.value = 0;
        this.droneGain.connect(this.ctx.destination);

        this.initialized = true;
        console.log('[SOUND] AudioContext создан, state:', this.ctx.state);
    }

    // Разблокировка для iOS — проигрываем тихий звук
    unlockiOS() {
        if (!this.ctx || this.unlocked) return;

        // Создаём и проигрываем пустой буфер
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
        source.stop(0.001);

        this.unlocked = true;
        console.log('[SOUND] iOS unlocked');
    }

    // Включить/выключить звук — СИНХРОННО для iOS
    toggle() {
        // 1. Создаём AudioContext синхронно внутри обработчика события
        if (!this.ctx) {
            this.init();
        }

        // 2. Resume если suspended (iOS требует)
        const resumePromise = this.ctx.resume();

        // 3. Переключаем состояние
        this.isEnabled = !this.isEnabled;

        console.log('[SOUND] Toggle:', this.isEnabled, 'ctx.state:', this.ctx.state);

        if (this.isEnabled) {
            // Ждём resume и запускаем звук
            resumePromise.then(() => {
                console.log('[SOUND] Context resumed, state:', this.ctx.state);

                // Тестовый бип для проверки (короткий)
                this.playTestBeep();

                // Запускаем основные звуки с задержкой
                setTimeout(() => {
                    this.startDrone();
                    if (window.game && window.game.state) {
                        this.updateForScene(window.game.state.currentScene);
                    }
                }, 200);
            });

            this.toggleBtn.textContent = '🔊 Звук';
            this.toggleBtn.classList.add('active');

            if (this.soundHint) {
                this.soundHint.classList.add('hidden');
            }
        } else {
            this.stopAll();
            this.toggleBtn.textContent = '🔇 Звук';
            this.toggleBtn.classList.remove('active');

            if (this.soundHint) {
                this.soundHint.classList.remove('hidden');
            }
        }
    }

    // Тестовый звук для проверки работы аудио
    playTestBeep() {
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = 440; // Нота Ля — хорошо слышна на любых динамиках

            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime);
            osc.stop(this.ctx.currentTime + 0.3);

            console.log('[SOUND] Test beep played');
        } catch (e) {
            console.log('[SOUND] Test beep error:', e);
        }
    }

    setVolume(value) {
        this.volume = value;
        if (this.masterGain) {
            this.masterGain.gain.value = value;
        }
    }

    stopAll() {
        this.stopWind();
        this.stopTV();
        this.stopDogs();
        this.stopDrone();
    }

    // === ВЕТЕР ===
    // Ветер — ЕЛЕ СЛЫШНЫЙ фон, только ощущение холода
    createWind(intensity = 0.3) {
        if (!this.initialized || !this.isEnabled) return;
        this.stopWind();

        // Белый шум
        const bufferSize = 2 * this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        // Lowpass 600 Hz — очень глухой, не маскирует пианино
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600; // 500-700 Hz
        filter.Q.value = 0.5;

        // LFO для медленной пульсации
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.15; // Медленнее
        lfoGain.gain.value = 100; // Модуляция 600±100 Hz
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        // Громкость — ЕЛЕ СЛЫШНЫЙ (0.1-0.15 от исходного)
        const gain = this.ctx.createGain();
        gain.gain.value = intensity * 0.12; // ~0.036 при intensity=0.3

        // Соединяем
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        lfo.start();

        this.windNodes = { noise, filter, lfo, lfoGain, gain };
        console.log('[WIND] Громкость:', (intensity * 0.12).toFixed(3));
    }

    stopWind() {
        if (this.windNodes) {
            try {
                this.windNodes.noise.stop();
                this.windNodes.lfo.stop();
            } catch (e) {}
            this.windNodes = null;
        }
    }

    // === TV STATIC ===
    createTV(intensity = 0.15) {
        if (!this.initialized || !this.isEnabled) return;
        this.stopTV();

        // Белый шум для статики
        const bufferSize = this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        // Высокочастотный фильтр
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 3000;

        // Небольшая модуляция для "мерцания"
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 8;
        lfoGain.gain.value = 0.3;

        const gain = this.ctx.createGain();
        gain.gain.value = intensity;

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        lfo.start();

        this.tvNodes = { noise, filter, lfo, lfoGain, gain };
    }

    stopTV() {
        if (this.tvNodes) {
            try {
                this.tvNodes.noise.stop();
                this.tvNodes.lfo.stop();
            } catch (e) {}
            this.tvNodes = null;
        }
    }

    // === СОБАКИ ===
    startDogs(frequency = 15000) {
        if (!this.initialized || !this.isEnabled) return;
        this.stopDogs();

        this.dogsFrequency = frequency;
        this.dogsInterval = setInterval(() => {
            if (this.isEnabled) {
                this.playBark();
                // Иногда несколько лаев подряд
                if (Math.random() > 0.6) {
                    setTimeout(() => this.playBark(), 300);
                    if (Math.random() > 0.5) {
                        setTimeout(() => this.playBark(), 600);
                    }
                }
            }
        }, frequency + Math.random() * 10000);

        // Первый лай через 3-8 сек
        setTimeout(() => this.playBark(), 3000 + Math.random() * 5000);
    }

    playBark() {
        if (!this.initialized || !this.isEnabled) return;

        const now = this.ctx.currentTime;

        // Основной тон лая
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150 + Math.random() * 50, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        // Фильтр для глухого звука (далёкий лай)
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    stopDogs() {
        if (this.dogsInterval) {
            clearInterval(this.dogsInterval);
            this.dogsInterval = null;
        }
    }

    // ============================================
    // ТРЕВОЖНОЕ ПИАНИНО — ВСЕГДА АКТИВНО
    // ============================================

    // ============================================
    // DRONE — ПОСТОЯННЫЙ ТРЕВОЖНЫЙ ГУЛ
    // ============================================

    createReverb() {
        if (this.reverbNode) return;

        // 6 секунд тёмного reverb
        const length = this.ctx.sampleRate * 6;
        const impulse = this.ctx.createBuffer(2, length, this.ctx.sampleRate);

        for (let ch = 0; ch < 2; ch++) {
            const data = impulse.getChannelData(ch);
            for (let i = 0; i < length; i++) {
                const decay = Math.pow(1 - i / length, 0.7);
                data[i] = (Math.random() * 2 - 1) * decay;
            }
        }

        this.reverbNode = this.ctx.createConvolver();
        this.reverbNode.buffer = impulse;

        const reverbFilter = this.ctx.createBiquadFilter();
        reverbFilter.type = 'lowpass';
        reverbFilter.frequency.value = 400;

        this.reverbNode.connect(reverbFilter);
        reverbFilter.connect(this.droneGain);
    }

    // Запуск DRONE — ОДИН РАЗ, работает постоянно
    startDrone() {
        if (!this.initialized || !this.isEnabled) return;
        if (this.droneNodes) return; // Уже запущен

        this.createReverb();

        const F = this.FEAR;
        const now = this.ctx.currentTime;

        // === ОСНОВНОЙ DRONE (40-70 Hz) ===
        const droneOsc = this.ctx.createOscillator();
        droneOsc.type = 'sine';
        droneOsc.frequency.value = F.droneFreq;

        // === ГАРМОНИКА (120-180 Hz) — слышимая часть ===
        const harmOsc = this.ctx.createOscillator();
        harmOsc.type = 'sine';
        harmOsc.frequency.value = F.droneHarmonicFreq;

        // === LFO для медленного колебания громкости ===
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = F.droneLFOSpeed; // ~0.08 Hz = период ~12 сек

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = F.droneVolume * F.droneLFODepth;

        // === Gain для каждого слоя ===
        const droneOscGain = this.ctx.createGain();
        droneOscGain.gain.value = F.droneVolume;

        const harmOscGain = this.ctx.createGain();
        harmOscGain.gain.value = F.droneHarmonicVol;

        // LFO модулирует громкость основного дрона
        lfo.connect(lfoGain);
        lfoGain.connect(droneOscGain.gain);

        // === Микс ===
        droneOsc.connect(droneOscGain);
        harmOsc.connect(harmOscGain);

        droneOscGain.connect(this.droneGain);
        harmOscGain.connect(this.droneGain);

        // Плавное включение
        this.droneGain.gain.setValueAtTime(0, now);
        this.droneGain.gain.linearRampToValueAtTime(1, now + 2);

        // Запуск
        droneOsc.start(now);
        harmOsc.start(now);
        lfo.start(now);

        this.droneNodes = { droneOsc, harmOsc, lfo, lfoGain, droneOscGain, harmOscGain };

        // Запуск всплесков
        this.scheduleSurge();

        console.log('[DRONE] Запущен | freq:', F.droneFreq, 'Hz | harmonic:', F.droneHarmonicFreq, 'Hz | LFO:', F.droneLFOSpeed, 'Hz');
    }

    // Остановка drone
    stopDrone() {
        if (this.droneNodes) {
            const now = this.ctx.currentTime;

            // Плавное выключение
            this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
            this.droneGain.gain.linearRampToValueAtTime(0, now + 1);

            setTimeout(() => {
                try {
                    this.droneNodes.droneOsc.stop();
                    this.droneNodes.harmOsc.stop();
                    this.droneNodes.lfo.stop();
                } catch (e) {}
                this.droneNodes = null;
            }, 1100);
        }

        if (this.surgeTimeout) {
            clearTimeout(this.surgeTimeout);
            this.surgeTimeout = null;
        }

        console.log('[DRONE] Остановлен');
    }

    // ============================================
    // ВСПЛЕСКИ — редкие искажения из дрона
    // ============================================

    // Планирование следующего всплеска (НЕПРЕДСКАЗУЕМО)
    scheduleSurge() {
        if (!this.isEnabled) return;

        const F = this.FEAR;
        // Случайный интервал
        const delay = F.surgeMinInterval + Math.random() * (F.surgeMaxInterval - F.surgeMinInterval);

        this.surgeTimeout = setTimeout(() => {
            if (this.isEnabled && this.droneNodes) {
                this.playSurge();
                this.scheduleSurge(); // Следующий
            }
        }, delay);

        console.log('[SURGE] Следующий через', Math.round(delay / 1000), 'с');
    }

    // Всплеск — нота выходит из гула и тонет обратно
    playSurge() {
        if (!this.ctx || !this.isEnabled) return;

        const F = this.FEAR;
        const now = this.ctx.currentTime;

        // Частота близка к дрону, но чуть "фальшивая"
        const baseFreq = F.droneFreq * (Math.random() < 0.5 ? 2 : 3); // Октава или квинта выше
        const detune = (Math.random() - 0.5) * F.surgeDetune * 2;

        console.log('[SURGE] Всплеск | freq:', Math.round(baseFreq), 'Hz | detune:', Math.round(detune), 'c');

        // === ОСНОВНОЙ ТОН — выходит из гула ===
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = baseFreq;
        osc.detune.value = detune;

        const oscGain = this.ctx.createGain();
        const duration = F.surgeDuration + Math.random() * 2;

        // Envelope: медленно выходит → держится → тонет обратно
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(F.surgeVolume, now + duration * 0.3); // Выход
        oscGain.gain.setValueAtTime(F.surgeVolume * 0.8, now + duration * 0.5);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Тонет

        osc.connect(oscGain);

        // === ГАРМОНИКА для слышимости ===
        const harm = this.ctx.createOscillator();
        harm.type = 'sine';
        harm.frequency.value = baseFreq * 2;
        harm.detune.value = detune * 0.7;

        const harmGain = this.ctx.createGain();
        harmGain.gain.setValueAtTime(0, now);
        harmGain.gain.linearRampToValueAtTime(F.surgeVolume * 0.4, now + duration * 0.25);
        harmGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);

        harm.connect(harmGain);

        // === ДИССОНАНС (случайно) ===
        let dissOsc = null;
        let dissGain = null;
        if (Math.random() < F.surgeDissonance) {
            dissOsc = this.ctx.createOscillator();
            dissOsc.type = 'sine';
            // Малая секунда — самый неприятный интервал
            dissOsc.frequency.value = baseFreq * (Math.random() < 0.5 ? 1.059 : 0.944);
            dissOsc.detune.value = (Math.random() - 0.5) * F.surgeDetune * 3;

            dissGain = this.ctx.createGain();
            dissGain.gain.setValueAtTime(0, now);
            dissGain.gain.linearRampToValueAtTime(F.surgeVolume * 0.5, now + duration * 0.35);
            dissGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);

            dissOsc.connect(dissGain);
        }

        // === Фильтр — глухой звук ===
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;

        // === Микс ===
        oscGain.connect(filter);
        harmGain.connect(filter);
        if (dissGain) dissGain.connect(filter);

        // Сухой выход
        const dry = this.ctx.createGain();
        dry.gain.value = 0.5;
        filter.connect(dry);
        dry.connect(this.droneGain);

        // Reverb
        if (this.reverbNode) {
            const wet = this.ctx.createGain();
            wet.gain.value = 0.6;
            filter.connect(wet);
            wet.connect(this.reverbNode);
        }

        // Запуск
        osc.start(now);
        harm.start(now);
        if (dissOsc) dissOsc.start(now);

        const stopTime = now + duration + 1;
        osc.stop(stopTime);
        harm.stop(stopTime);
        if (dissOsc) dissOsc.stop(stopTime);
    }

    // Fade out для good финала
    startFadeOut(duration) {
        if (!this.droneGain) return;

        const now = this.ctx.currentTime;
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
        this.droneGain.gain.linearRampToValueAtTime(0, now + duration / 1000);

        console.log('[DRONE] Fade out за', duration / 1000, 'с');
    }

    // Заглушки для совместимости
    setStress(value) { }
    setDreadIntensity(level) {
        if (level === 'fadeout') {
            this.startFadeOut(12000);
        }
    }
    stopPiano() { this.stopDrone(); }

    // === ТЕСТ ===
    testPiano() {
        if (!this.initialized) this.init();
        this.ctx.resume();

        const wasEnabled = this.isEnabled;
        this.isEnabled = true;

        if (!this.droneNodes) {
            this.startDrone();
        }

        // Принудительный всплеск
        this.playSurge();

        if (!wasEnabled) {
            setTimeout(() => {
                this.isEnabled = wasEnabled;
            }, 5000);
        }
    }

    // === ОБНОВЛЕНИЕ ДЛЯ СЦЕНЫ ===
    updateForScene(sceneId) {
        // Сохраняем sceneId для логов
        this.currentSceneId = sceneId;

        if (!this.isEnabled) return;

        // === DRONE: работает ПОСТОЯННО ===
        // Гарантия что drone запущен
        if (!this.droneNodes) {
            this.startDrone();
        }

        // Сцены с собаками (чаще лай)
        const dogScenes = ['s6_dogs', 's6_dogs_fire', 's6_dogs_freeze', 'minigame_chase', 's7_stop_bad'];

        // Сцены опасности (бандиты, собаки)
        const dangerScenes = [...dogScenes, 's5_shop', 's5_oleg_talk', 's5_oleg_lie', 's5_oleg_block', 's5_oleg_knife', 's10_peek', 's10_run_road'];

        // Fade out только для хорошего финала
        if (sceneId === 'end_good') {
            this.startFadeOut(15000); // 15 сек fade out
        }

        // === ОСТАЛЬНЫЕ ЗВУКИ ===
        if (sceneId === 's1_home') {
            this.createTV(0.10);
            this.createWind(0.08);
            this.startDogs(25000);
        }
        else if (sceneId === 'end_bad' || sceneId === 'ending_stress' || sceneId === 'ending_money') {
            this.stopTV();
            this.stopWind();
            this.stopDogs();
        }
        else if (sceneId === 'end_good') {
            this.stopTV();
            this.createWind(0.05);
            this.stopDogs();
        }
        else if (dangerScenes.includes(sceneId)) {
            this.stopTV();
            this.createWind(0.12);
            if (dogScenes.includes(sceneId)) {
                this.startDogs(5000);
            } else {
                this.startDogs(12000);
            }
        }
        else {
            this.stopTV();
            this.createWind(0.12);
            this.startDogs(18000);
        }
    }
}

// ============================================
// ИГРОВОЙ ДВИЖОК
// ============================================
class NovelGame {
    constructor() {
        this.state = {
            stress: 0,
            money: 1000,
            inventory: [],
            flags: {},
            currentScene: "s1_home",
            choices: 0,
            startTime: Date.now()
        };

        this.timer = null;
        this.timerValue = 6;
        this.TIMER_DURATION = 6;

        this.elements = {
            sceneText: document.getElementById('sceneText'),
            choices: document.getElementById('choices'),
            timerContainer: document.getElementById('timerContainer'),
            timerBar: document.getElementById('timerBar'),
            timerText: document.getElementById('timerText'),
            stressBar: document.getElementById('stressBar'),
            stressValue: document.getElementById('stressValue'),
            moneyValue: document.getElementById('moneyValue'),
            inventory: document.getElementById('inventory'),
            gameScreen: document.getElementById('gameScreen'),
            endingScreen: document.getElementById('endingScreen'),
            endingTitle: document.getElementById('endingTitle'),
            endingText: document.getElementById('endingText'),
            endingStats: document.getElementById('endingStats'),
            sceneBackground: document.getElementById('sceneBackground')
        };

        // Звуковой менеджер
        this.sound = new SoundManager();

        this.init();
    }

    init() {
        // Попытка загрузить сохранение
        const saved = localStorage.getItem('novelGameSave');
        if (saved) {
            try {
                this.state = JSON.parse(saved);
                console.log('Загружено сохранение');
            } catch (e) {
                console.log('Ошибка загрузки сохранения');
            }
        }

        this.updateUI();
        // Синхронизировать стресс с музыкой при загрузке
        this.sound.setStress(this.state.stress);
        this.showScene(this.state.currentScene);
    }

    // Показать сцену
    showScene(sceneId) {
        this.stopTimer();

        const scene = SCENES.find(s => s.id === sceneId);
        if (!scene) {
            console.error('Сцена не найдена:', sceneId);
            this.elements.sceneText.textContent = 'Ошибка: сцена "' + sceneId + '" не найдена.';
            return;
        }

        this.state.currentScene = sceneId;

        // Сменить фон
        if (scene.background) {
            this.changeBackground(scene.background);
        }

        // Обновить звуки для сцены
        this.sound.updateForScene(sceneId);

        // Проверка на финал
        if (scene.ending) {
            this.showEnding(scene);
            return;
        }

        // Показать текст
        this.elements.sceneText.textContent = scene.text;
        this.elements.sceneText.classList.add('fade-in');
        setTimeout(() => this.elements.sceneText.classList.remove('fade-in'), 500);

        // Показать варианты
        this.showChoices(scene.options);

        // Запустить таймер только если указан timeout
        if (scene.timeout && scene.options && scene.options.length > 0) {
            this.startTimer(scene.options, scene);
        }
    }

    // Показать варианты выбора
    showChoices(choices) {
        this.elements.choices.innerHTML = '';

        if (!choices || choices.length === 0) return;

        // Фильтруем варианты по условиям
        const availableChoices = choices.filter(choice => {
            // Проверка condition
            if (choice.condition) {
                if (choice.condition.flag && !this.state.flags[choice.condition.flag]) {
                    return false;
                }
                if (choice.condition.noFlag && this.state.flags[choice.condition.noFlag]) {
                    return false;
                }
                if (choice.condition.hasItem && !this.state.inventory.includes(choice.condition.hasItem)) {
                    return false;
                }
                if (choice.condition.minMoney !== undefined && this.state.money < choice.condition.minMoney) {
                    return false;
                }
                if (choice.condition.maxStress !== undefined && this.state.stress > choice.condition.maxStress) {
                    return false;
                }
            }

            // Проверка requires
            if (choice.requires) {
                if (choice.requires.item && !this.state.inventory.includes(choice.requires.item)) {
                    return false;
                }
                if (choice.requires.moneyAtLeast !== undefined && this.state.money < choice.requires.moneyAtLeast) {
                    return false;
                }
            }

            return true;
        });

        availableChoices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn fade-in';
            btn.style.animationDelay = (index * 0.1) + 's';

            if (choice.hesitate) {
                btn.classList.add('hesitate');
            }

            let html = choice.text;

            // Показать эффекты
            const effects = this.formatEffects(choice.effects);
            if (effects) {
                html += '<div class="choice-effect">' + effects + '</div>';
            }

            btn.innerHTML = html;
            btn.onclick = () => this.makeChoice(choice);

            this.elements.choices.appendChild(btn);
        });
    }

    // Форматирование эффектов для отображения
    formatEffects(effects) {
        if (!effects) return '';

        const parts = [];

        if (effects.stress > 0) {
            parts.push('<span class="negative">Стресс +' + effects.stress + '</span>');
        } else if (effects.stress < 0) {
            parts.push('<span class="positive">Стресс ' + effects.stress + '</span>');
        }

        if (effects.money > 0) {
            parts.push('<span class="positive">+' + effects.money + ' ₽</span>');
        } else if (effects.money < 0) {
            parts.push('<span class="negative">' + effects.money + ' ₽</span>');
        }

        if (effects.addItem) {
            parts.push('<span class="positive">+' + effects.addItem + '</span>');
        }

        if (effects.removeItem) {
            parts.push('<span class="negative">-' + effects.removeItem + '</span>');
        }

        return parts.join(' ');
    }

    // Сделать выбор
    makeChoice(choice) {
        this.stopTimer();
        this.state.choices++;

        // Применить эффекты
        if (choice.effects) {
            this.applyEffects(choice.effects);
        }

        // Проверка на проигрыш
        if (this.state.stress >= 100) {
            this.showScene('ending_stress');
            return;
        }

        if (this.state.money < 0) {
            this.showScene('ending_money');
            return;
        }

        // Перейти к следующей сцене
        if (choice.next) {
            this.showScene(choice.next);
        }
    }

    // Применить эффекты
    applyEffects(effects) {
        if (effects.stress !== undefined) {
            this.state.stress = Math.max(0, Math.min(100, this.state.stress + effects.stress));
            // Синхронизировать стресс с музыкой
            this.sound.setStress(this.state.stress);
        }

        if (effects.money !== undefined) {
            this.state.money += effects.money;
        }

        if (effects.addItem && this.state.inventory.length < 3) {
            if (!this.state.inventory.includes(effects.addItem)) {
                this.state.inventory.push(effects.addItem);
            }
        }

        if (effects.removeItem) {
            const idx = this.state.inventory.indexOf(effects.removeItem);
            if (idx > -1) {
                this.state.inventory.splice(idx, 1);
            }
        }

        if (effects.setFlag) {
            this.state.flags[effects.setFlag] = true;
        }

        if (effects.removeFlag) {
            delete this.state.flags[effects.removeFlag];
        }

        this.updateUI();
    }

    // Обновить интерфейс
    updateUI() {
        // Стресс
        this.elements.stressBar.style.width = this.state.stress + '%';
        this.elements.stressValue.textContent = this.state.stress;

        // Деньги
        this.elements.moneyValue.textContent = this.state.money.toLocaleString() + ' ₽';
        this.elements.moneyValue.style.color = this.state.money < 200 ? '#ef4444' : '#4ade80';

        // Инвентарь
        this.elements.inventory.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            if (this.state.inventory[i]) {
                const item = document.createElement('div');
                item.className = 'inventory-item';
                item.textContent = this.state.inventory[i];
                item.title = ITEMS[this.state.inventory[i]] || 'Предмет';
                this.elements.inventory.appendChild(item);
            } else {
                const slot = document.createElement('div');
                slot.className = 'inventory-slot';
                this.elements.inventory.appendChild(slot);
            }
        }
    }

    // Таймер
    startTimer(options, scene) {
        const duration = (scene.timeout || this.TIMER_DURATION) * 1000;
        this.timerValue = scene.timeout || this.TIMER_DURATION;
        this.elements.timerContainer.classList.remove('hidden');
        this.elements.timerBar.style.width = '100%';
        this.elements.timerBar.classList.remove('warning');
        this.elements.timerText.textContent = this.timerValue;

        const startTime = Date.now();

        this.timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);
            const percent = (remaining / duration) * 100;

            this.elements.timerBar.style.width = percent + '%';
            this.timerValue = Math.ceil(remaining / 1000);
            this.elements.timerText.textContent = this.timerValue;

            if (percent < 40) {
                this.elements.timerBar.classList.add('warning');
            }

            if (remaining <= 0) {
                this.onTimerEnd(options, scene);
            }
        }, 50);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.elements.timerContainer.classList.add('hidden');
    }

    onTimerEnd(options, scene) {
        this.stopTimer();

        // Если у сцены есть onTimeout — используем его
        if (scene && scene.onTimeout) {
            setTimeout(() => {
                if (scene.onTimeout.effects) {
                    this.applyEffects(scene.onTimeout.effects);
                }
                if (scene.onTimeout.next) {
                    this.showScene(scene.onTimeout.next);
                }
            }, 500);
            return;
        }

        // Ищем вариант "замешкался"
        let hesitateChoice = options.find(c => c.hesitate);

        // Если нет - берём первый доступный
        if (!hesitateChoice) {
            const available = options.filter(choice => {
                if (!choice.condition) return true;
                if (choice.condition.flag) return this.state.flags[choice.condition.flag];
                return true;
            });
            hesitateChoice = available[0];
        }

        if (hesitateChoice) {
            // Подсветить выбранный вариант
            const buttons = this.elements.choices.querySelectorAll('.choice-btn');
            buttons.forEach(btn => {
                if (btn.textContent.includes(hesitateChoice.text.substring(0, 20))) {
                    btn.style.background = 'rgba(200, 150, 100, 0.3)';
                }
            });

            setTimeout(() => {
                this.makeChoice(hesitateChoice);
            }, 500);
        }
    }

    // Показать финал
    showEnding(scene) {
        this.elements.gameScreen.classList.add('hidden');
        this.elements.endingScreen.classList.remove('hidden');

        const isGood = scene.id.includes('good') || scene.id.includes('win');

        this.elements.endingTitle.textContent = scene.title || 'КОНЕЦ';
        this.elements.endingTitle.className = 'ending-title ' + (isGood ? 'good' : 'bad');

        this.elements.endingText.textContent = scene.text;

        // Статистика
        const playTime = Math.floor((Date.now() - this.state.startTime) / 1000);
        const minutes = Math.floor(playTime / 60);
        const seconds = playTime % 60;

        this.elements.endingStats.innerHTML = `
            <div class="ending-stat">
                <span>Время игры:</span>
                <span>${minutes}:${seconds.toString().padStart(2, '0')}</span>
            </div>
            <div class="ending-stat">
                <span>Выборов сделано:</span>
                <span>${this.state.choices}</span>
            </div>
            <div class="ending-stat">
                <span>Финальный стресс:</span>
                <span>${this.state.stress}%</span>
            </div>
            <div class="ending-stat">
                <span>Осталось денег:</span>
                <span>${this.state.money.toLocaleString()} ₽</span>
            </div>
            <div class="ending-stat">
                <span>Предметов собрано:</span>
                <span>${this.state.inventory.length}</span>
            </div>
        `;

        // Очистить сохранение при финале
        localStorage.removeItem('novelGameSave');
    }

    // Сохранить
    save() {
        localStorage.setItem('novelGameSave', JSON.stringify(this.state));
        this.showNotification('Игра сохранена!');
    }

    // Сбросить
    reset() {
        if (confirm('Точно сбросить весь прогресс?')) {
            localStorage.removeItem('novelGameSave');
            location.reload();
        }
    }

    // Начать заново
    restart() {
        localStorage.removeItem('novelGameSave');
        location.reload();
    }

    // Смена фона
    changeBackground(backgroundKey) {
        const bg = this.elements.sceneBackground;
        if (!bg) return;

        const imagePath = BACKGROUNDS[backgroundKey];
        if (!imagePath) {
            bg.style.backgroundImage = 'none';
            return;
        }

        // Плавная смена фона
        bg.classList.add('fade-out');

        setTimeout(() => {
            bg.style.backgroundImage = `url('${imagePath}')`;
            bg.classList.remove('fade-out');
        }, 400);
    }

    // Уведомление
    showNotification(text) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(74, 222, 128, 0.9);
            color: #000;
            padding: 10px 25px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        notif.textContent = text;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transition = 'opacity 0.3s';
            setTimeout(() => notif.remove(), 300);
        }, 2000);
    }
}

// Запуск игры
const game = new NovelGame();

// iOS тестовая кнопка
const iosTestBtn = document.getElementById('iosTestBtn');
const testAudio = document.getElementById('testAudio');

if (iosTestBtn) {
    const runTest = function() {
        // Вибрация чтобы понять что нажатие сработало
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        iosTestBtn.textContent = '⏳ Тестирую...';
        iosTestBtn.style.background = '#f59e0b';

        let status = [];

        // Способ 1: HTML5 Audio
        if (testAudio) {
            testAudio.currentTime = 0;
            testAudio.volume = 1.0;
            testAudio.play().then(() => {
                status.push('HTML5:OK');
                updateStatus();
            }).catch(err => {
                status.push('HTML5:' + err.name);
                updateStatus();
            });
        }

        // Способ 2: Web Audio API
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();

            status.push('Ctx:' + ctx.state);

            ctx.resume().then(() => {
                status.push('Resume:' + ctx.state);

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.frequency.value = 440;
                gain.gain.value = 1.0; // Максимальная громкость
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 1.0); // 1 секунда

                status.push('WebAudio:OK');
                updateStatus();
            }).catch(err => {
                status.push('Resume:' + err.name);
                updateStatus();
            });
        } catch(e) {
            status.push('WebAudio:' + e.name);
            updateStatus();
        }

        function updateStatus() {
            iosTestBtn.innerHTML = status.join('<br>');
            if (status.some(s => s.includes('OK'))) {
                iosTestBtn.style.background = '#22c55e';
            } else {
                iosTestBtn.style.background = '#ef4444';
            }
        }

        // Показать статус через секунду в любом случае
        setTimeout(updateStatus, 1000);
    };

    iosTestBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        runTest();
    }, { passive: false });

    iosTestBtn.addEventListener('click', runTest);
}
