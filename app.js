require('dotenv').config();

const {
  express,
  mongoose,
  helmet,
  validateErrorsByCelebrate,
  cors,
} = require('./config');

const { corsOptions } = require('./corsOptions');

const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movies');
const { signInRouter } = require('./routes/singin');
const { signUpRouter } = require('./routes/singup');
const { notFoundRouter } = require('./routes/pathNotFound');

// Мидлвара для обеспечения защиты роутов
// (пользователь должен авторизоваться, чтобы посылать запросы - кроме signup и signin)
const { auth } = require('./middlewares/auth');

// Мидлвара для обработки ошибок в самом конце работы приложения
const { errors } = require('./middlewares/error');

// Плагин для работы (автоматического создания и наполнения) с логами запросов и ошибок
const { requestLogger, errorLogger } = require('./middlewares/logger');

const DATABASE = 'mongodb://127.0.0.1:27017/filmsdb';
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(DATABASE);

// app.options(
//   '*',
//   cors({
//     origin: corsOptions
//   }),
// );

// То же самое, что и плагин body-parser, работает как мидлвара.
// Нужен для представления POST и PUT запросов в виде json-объектов.
app.use(express.json());

// используется для устранения ошибок CORS
// позволяет серверу указывать любые источники (отличающиеся по протоколу, имени хоста или порту)
// от источника, из которого неизвестный источник получает разрешение на доступ и загрузку ресурсов
app.use(
  cors({
    origin: corsOptions,
  }),
);

// Нужен просто для защиты - борется с девятью самыми основными уязвимостями
// при отправке просто устанавливая соответствующие заголовки
app.use(helmet());

app.use(requestLogger);

app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

// это просто тестовая страница для отработки ситуации с падением сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('*', notFoundRouter);

app.use(errorLogger);

app.use(validateErrorsByCelebrate());
app.use(errors);

app.listen(PORT, () => {
  // console.log('Сервер запущен на порту - ', PORT);
});
