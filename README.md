# Mytube!

정규표현식 익히기

비디오 못 찾는 경우 404 리턴
GET EDIT 페이지 완성
edit 페이지 input 에 값을 프리로드
해쉬태그 다룰때 .join 이용

mongoose 에서 save 전, 후로 미들웨어 적용가능
미들웨어는 model이 생성되기전에 만들어야 함
save 되기 전 (pre) 에 작동하는 미들웨어 생성
해쉬태그 배열의 첫번째 스트링을 쪼개서 나누고 # 붙히는 미들웨어 생성

findOneAndUpdate 는 this 처럼 this 문서에 접근 불가해서 위에서 만든 미들웨어 사용 못 함
그래서 위의 미들웨어 없앰
모델에 formathashtags 함수를 만들어서 사용 => 좋은 솔루션!
허나 다른 방법도 존재 Static 등장
Video 모델만 임포트하면 자동으로 딸려오기에 유용

6-25
watch 에서 딜리트 앵커 추가
라우터 컨트롤러 추가
findOneAndRemove 와 Delete 의 차이? => 그냥 Delete 사용

6-26
비디오가 최신일수록 위로오게 정렬
home에서 .sort({createdAt: "desc"}) 사용
search 라우터 템플릿 만들고 인풋값 쿼리로 받음
빈 배열을 만들어서 비디오들을 집어넣음!
믹스인 사용해서 표기
정규포현식 사용!!
https://docs.mongodb.com/manual/reference/operator/query/regex/

7-0
유저 모델 생성하고 init에서 임포트
글로벌 => 루트 라우터 이름변경
getJoin postJoin 만듬
Join 템플릿

7-1
유저를 생성하고 생성 후 /login 으로 리다이렉트

7-2
https://www.npmjs.com/package/bcrypt
bcrypt 로 비밀번호 해싱
user 모델에 .pre("save) 를 이용해서 저장전에 비밀번호를 해싱

7-3
중복 계정 방지
이미있는 이메일, 유저네임으로 생성하려하면 어떻게?
User.exists 사용해서 체크, 이메일도 체크
근데 따로 만들면 번잡하니 $or 오퍼레이터 사용
조건의 배열을 사용법
템플릿에 password2 추가해서 password와 비교

7-4
status code
200 => OK 그냥두면 200번 보냄
2XX => OK
4XX => BAD REQUEST
400 번
오류나도 200 보내서 브라우저가 비밀번호 저장하려 함
400번 사용

7-5
try catch 사용해 오류 발생시 잡음 error.\_message 로 내용 표시
login 라우터 ,getLogin, postLogin 템플릿 생성
post 컨트롤러에 유저네임에 일치하는 유저 확인 후 없으면 오류 렌더

7-6
bcrupt compare() 사용해서 비밀번호 확인 => boolean 을 return
https://www.npmjs.com/package/bcrypt
username 과 일치하는 유저를 찾는데 위에서 exists 를 사용하고 있으니 exists 부분을 그냥 user object를 찾는거로 바꿈
해서 ok 에 불리언 값 받음 compare(입력 비번, db의 user의 비번) 사용

7-7
세션 => 백엔드와 브라우저간에 어떤 활동을 했는지 기억 브라우저와 백엔드 사이의 메모리
stateless 브라우저와 백엔드가 한 번 연결되고 끝남 ex) 템플릿을 렌더하고 끝 할 수 있는게 없음
로그인 할때마다 유저한테 뭔가를 줌 조그마한 텍스트 같은 걸
유저가 우리한테 요청할때마다 그 텍스트를 같이 보내달라고 하면 이거 너구나! 하고 알고 해당 유저의 프로파일을 보여줌

express-session 설치 npm i express-session
서버에서 임포트
미들웨어처럼 사용 app.use(session({secret: "Hello})) 헬로는 추후 바뀜 반드시 라우터 앞에서!
decrep 도 해결
이제 미들웨어가 사이트로 들어오는 모두를 기억함 들오온 이에게 텍스트를 주고 그걸 통해서 누군지 알 것
이제 들어가면 브라우저가 우리 서버에 요청을 보내고 우리 서버는 session 미들웨어가 브라우저한테 텍스트를 보내고 그 텍스트로 누군지 인식
이제 브라우저가 해당 쿠키를 서버로 자동으로 보냄
해당 텍스트가 브라우저의 아이디라고 생각하면 편함 다른 브라우저로 들어가보면 모두 다 다른 텍스트를 가지고있음

7-8
서버를 떳다가 다시키면 세션이 사라짐 express 가 세션을 메모리에 저장하고있기때문
즉 백엔드에 세션을 저장하는 DB가 생김 이 DB에 정보를 넣을 수 있음 => 해당 세션에서만 공유되는 정보 추가 가능

서버가 브라우저에게 세션 ID를 부여
브라우저가 요청(REQUEST)을 보낼때마다 쿠키에서 세션 ID를 가져와서 같이 보냄
서버가 그 세션 ID를 읽고 어떤 브라우저인지 (우리가 누군지) 알 수 있음
세션은 OBJECT 인데 여기에 우리가 값을 저장할 수 있음

강의에서 POTATO 카운터 만들었던 것 기억

세션ID: {
~~: ~~,
~: ~~,
potato: 5,
} <= 이 오브젝트가 세션!

7-9
누군가 ID 카드를 들고오면 해당 ID에 해당하는 정보를 주는 개념
userController 에서 누군가 login 을하면 해당 세션에 loggedIn = true 로 설정
세션의user 에 불러온 user 집어넣음
각 브라우저마다 서로 다른 세션을 가지고있다는 것을 꼭 기억!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
그럼 템플릿에서 로그인되었으면 Join 과 login 을 가리고 logout 을 표시
템플릿에서 세션에 접근하는 법은?

7-10
템플릿에서 res 오브젝트의 locals object 에 접근 기본적으로 가능
res.locals.pretty = "noru";
템플릿에서 #{pretty} 하면 noru 출력!!!!! 매우 간단하게 사용 가능
locals 에 로그인 한 사용자 추가 => 모든 템플릿이 로그인 한 유저 정보 인지
locals 미들웨어를 생성 후 익스포트 그리고 server 에서 임포트
locals 에 사이트 네임 저장하고 베이스 템플릿에서 사이트네임 사용
locals 에 loggedIn 을 boolean 으로 판단 req.session.loggedIn 에서 가져옴
베이스 템플릿에서 로그인 중이라면 로그아웃을 아니라면 jon login 보이게 함
locals에 loggedInUser 를 세션 유저를 집어넣음
템플릿에서 로그인 되었다면 user의 name의 프로파일로 가는 버튼 추가!

7-11
현재는 서버 재시작하면 session 을 저장하고있는 session store 가 초기화되서 모든 로그인이 끊김
=> mongoDB 에 session store를 저장해서 다음에 해결

7-12
session id 는 쿠기에 저장하지만 데이터 자체는 서버에 저장
세션을 DB에 저장하기위해 session store 사용 => npm i connect-mongo
https://www.npmjs.com/package/connect-mongo
DB 에 sessions 콜렉션이 생김
이제 서버 재시작해도 session 이 남아있음

7-13
그런데 쿠키를 지우고 새로고침하면 새로운 쿠키와 세션이 생성됨
그런데 봇이나 로그인하지 않고 구경만하는 사람들이 방문해도 즉 모든 사용자에게 쿠키와 세션이 만들어짐 => DB 낭비, 손해
로그인한 사용자의 세션만 저장하는게 경제적, 효과적
resave, Uninitial 어쩌고 => false로 하면 이렇게 됨

7-14
쿠키의 property f12 콘솔 쿠키의 프로퍼티
secret 은 우리가 쿠키에 sign 할떄 사용하는 string
우리 backend 가 아이디를 줬다는 것을 증명할떄 쓰임
Domain 쿠키를 만든 backend 가 누구인지 알려줌
path는 그냥 url
expires 는 말 그대로 만료되는 기간
max-age 만료 일자
cookie: {
maxAge: 20000 => 20초 (MS로 계산)
}
우리는 STORE URL 과 SECRET 을 보호해야함 코드에서 사용하지만 값은 안보이게 할 수 있음
최상위 경로에 .env 파일 생성, gitignore 에 .env 추가
.env에 코드에 들어가면 안되는 값을 넣음 (secret) 관습적으로 .env 안에는 모드ㅜ 대문자로 작성
어떻게 .env에 접근할까?
process.env.DB_URL 처럼 사용 => 에러 발생 무언가를 해야하는 듯

7-15
dotenv 패키지 설치
가능한 제일 먼저 dotenv 임포트
근데 db에서 오류 발, 지금은 임포트를 server.js 에서 함
우리의 서버는 init.js 에서 시작함 server에서 실행하면 제일 먼저가 아님! =>> init 에 dotenv 임포트
근데 아직도 안 됨 => require로 임포트해서, require로 임포트하면 dotenv를 사용하고싶은 모든 파일에 require 추가해야함
매우 번거로움
그래서 다신에 require 를 import로 수정
require("dotenv).config() => import "dotenv/config";
성공!
이렇게 cookie secret 과 db_url 을 보호
