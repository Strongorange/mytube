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

7-16
깃헙 로그인 시작
https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
깃허브 계정 => setting => Developer settings => OAuth Apps => New 앱을 만듬
authorization callback url 에는 아무거나 넣얻 되는데 http://localhost:5000/users/github/callback 넣음 코드에서 사용함
생성

1. 유저는 깃헙 신워을 요청하기위해 깃허브로 리다이렉트 됨
   login 템플렛에 깃허브 로그인 사이트 https://github.com/login/oauth/authorize 로 보는 링크 추가
   헌데 파라메터들을 같이 보내줘야함
   https://github.com/login/oauth/authorize?client_id=ccf7238f01d21f284b48
   client_id 는 깃허브 앱 만들면 주어짐 파라메터(query?) 는 ? 로 연결
   연결 성공 근데 우리는 public data 외에 더 많은 정보가 필요
   scope를 이용해서 정보 더 요구 space-delimited (공백으로 구분되는)
   https://github.com/login/oauth/authorize?client_id=ccf7238f01d21f284b48&allow_signup=false
   &allow_signup=false 을 붙이면 깃허브 계정생성이 안 뜸 이미 있는 유저만 로그인 가능

7-17
https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
scope 유저에게 얼마나 많이 정보를 읽어내고 어떤 정보를 가져올 것인가
read:user, user:email 정도면 될 듯
https://github.com/login/oauth/authorize?client_id=ccf7238f01d21f284b48&allow_signup=false&scope=user:email
이메일 읽기 요청
스코프 추가시 공백으로 구분하면 됨 (space-delimited)
https://github.com/login/oauth/authorize?client_id=ccf7238f01d21f284b48&allow_signup=false&scope=user:email read:user

근데 이렇게 긴 URL을 계속해서 업데이트하기 힘듬 정리가 필요
로그인 템플릿 깃헙 로그인 url을 "/users/github/start" 로
라우터와 컨트롤러 만들고 컨트롤러에 https://github.com/login/oauth/authorize 를 baseUrl로
config 객체도 생성 (scope 는 공백으로 분리)
URLSearchParams(config).toString() 을 이용해서 url로 만듬!!!
base, final 나눠서 멋진 url 시스템을 만듬

authorize 버튼을 누르면 우리가 설정했던 (oauth 앱에서 설정한) callback 주소로 리다이렉트됨
리다이렉트될떄 코드와 함께 리다이렉트됨!
이제 해당 라우터를 만들어줌
oauthi 앱 콜백을 http://localhost:5000/users/github/finish 로
finish 라우터와 컨트롤러 만듬

7-18
깃허브에서 우리 사이트로 다시 리다이렉팅함 깃허브에서 받은 코드를 Access 토큰으로 바꿔야함
POST https://github.com/login/oauth/access_token  
주소로 파라메터들과 포스트 요청
코드는 url에 잇고 클라이언트 아이디는 있고 클라이언트 시크릿은 이제 생성
클라이언트 아이디를 .env에 저장
깃허브 앱 SECRET 도 ENV에 저장
finishGithubLogin 에 앞에처럼 config 저장
URLSearchparameter 이용해서 앞 처럼 URL 생성
이제 POST 요청을 보내야하는데 FORM 에서 보내는건 했는데 컨트롤러 내에서는 어떻게할까?
=> fetch 사용!
const data = await fetch(finalUrl, {
headers: {
Accept: "application/json",
},
method: "POST",
});

const json = await data.json();

};
header 부분은 json을 받기위해서 추가 이렇게해야 json을 받을 수 있음

근데 fetch는 NodeJs 에서는 기본적으로 사용 불가능

7-19
npm i node-fetch
이제 깃허브 서버에 POST를 보내서 데이터들을 잘 가져옴
이제 access_token 을 가지고 API에 접근
JSON 에서 access_token 추출
if("access_token" in json) 문법을 사용!!!! json 안에 access_token 이 있는경우
3단계서는 url에 get request를 전송 fetch 를 사용함 header 에 Authorization (문서 참조)
await 안에 await 사용해서 tokenRequest json을 생성 ==>>>> 계속 보면서 이해하기
tokenRequest 안에 access_token 있을때로 조건문 수정
조건문 안에도 await 안에 await => fetch 요청이 돌아오면 해당 fetch의 json을 받는 개념

다 가져옴! 근데 email 이 null 값임 => email이 없거나 private 인 경우 => 다른 request 를 만듬

7-20
private 이메일인 경우 null 되는것을 해결하기 위해서 동일한 access_token 을 사용해서 해결
https://docs.github.com/en/rest/reference/users#list-email-addresses-for-the-authenticated-user
모든 email 을 보여주기
emailData 도 만듬 형식은 동일
두 가지 데이터를 얻음 하나는 공개된 나의 데이터 하나는 나의 모든 이메일 정보
console 참조
이제 primary와 verified 가 모두 true 인 email 을 찾아야함
[ { email: 'chanhwi.lee6@gmail.com',
primary: true,
verified: true,
visibility: 'private' },
{ email: '74127841+Strongorange@users.noreply.github.com',
primary: false,
verified: true,
visibility: null } ]

이메일이 없다면 로그인 페이지로 리다이렉트

7-21
DB에 user가 하나 있는데 github 와 동일한 이메일을 가지고있는 유저가있다면?
username 과 password 로 로그인하게 할지 같은 email 로 가입되었으니 로그인이 되게할지
우리는 primary 하고 verified 된 이메일이 db에 있다면 로그인 시킴
만약 없다면? 새로 가입시켜야 함
userData 객체에있는 정보를 가지고 유저 생성!
유저 모델에 socialOnly 추가 => 유저가 깃허브로 로그인하는지 username 으로 로그인하는지 관리
깃허브로 계정이 생성되면 socialOnly true
근데 이렇게 하니 password 가 모델에서 required 로 설정되서 오류 => false로 바꿈

7-22
socialOnly true 를 가진 유저는 password 로 로그인 할 수 없음
=> postLogin 컨트롤러에서 username 을 가진 유저를 찾을때 socialOnly false 인 것도 고려해줘야함
다시 finishLogin 에서 let user 로 바꾸고 구조 수정

userData 에 존재하는 avatarUrl 을 user 모델에 추가하고 깃허브 유저를 만들떄 avatarURL 도 저장되게 만듬

라우터와 컨트롤러 만들고 req.session.destroy(); 로 세션을 없애 로그아웃!

8-0
edit 라우터 컨트롤러 템플릿 생성
res.locals 에 user가 저장되어있기에 템플릿에서 바로 가져올 수 있음

8-1
로그인 안 한 사람들이 보호된 페이지가 접근하는 것을 막음
로그인 한 사람들이 로그인 페이지로 가는 것을 막음 => 미들웨어 생성
라우터에서 중간에 만든 미들웨어 추가!
.all() 을 사용해서 한번에 적용가능 (get, post, put, delete)

8-2
비디오 라우터 에도 미들웨어 넣어줌
req.session 에는 user object 가 있음 (우리가 넣어줌 로그인 할 때)
그것을 이용해서 user의 id를 알 수 있음
mongoose findbyidandupdate 사용해서 업데이트
근데 DB에서는 업데이트 되었는데 브라우저에서는 VALUE 값이 바뀌지 않음
왜? 현재 VALUE 는 템플릿에서 처리하는데 res.locals.loggedInUser 의 값임 근데 이 값은 처음 로그인할때 생성됨
업데이트한 시점에서도 그대로 => 업데이트할때 locals 도 바꿔줌 => session 을 업데이트 해 줌

8-3
session은 로그인할떄만 건듬
업데이트를 해도 세션은 그대로 => 업데이트하고 세션도 업데이트
수동으로 한다면
req.session.user = {
...req.session.user, => req.session.user 의 내용물을 꺼냄
name,
email,
username,
location
}
같이 해줘야하는데 비효율적

기본적으로 findbyupdate 는 업데이트 이전의 유저를 return
new: true 를 설정해주면 업데이트 된 유저를 return
req.session.user = updatedUser 로 변경

8-4
비밀번호 변경
라우터 컨트롤러 템플릿 만듬
근데 view 폴더가 너무 지저분해서 폴더로 정리하고 ../base 로 베이스 불러오고 컨트롤러에서 users/change-password로 부름
깃허브를 통해 계정을 만들면 비밀번호가 없기에 비밀번호 변경을 볼 수 없어야 함
링크가 안 보이게 함

8-5
현재비번 새비번, 새비번확인에 따른 로직을 추가!
모델의 pre save 비밀번호를 해쉬해주는 미들웨어는 create 와 .save() 에서 동작
.save() 를 써야하니 session 에서 로그인된 user를 찾는다
id 로 유저를 찾고 user.password = newPassword 하고 user.save() 로 업데이트해서 해쉬 미들웨어 실행
session 도 업데이트 해줘야함!!!

8-6
파일 업로드
edit profile 에 avatar 인풋 레이블 생성
accept="image/\*" 속성을 추가해서 이미지만 받는다고 설정
multer 패키지 설치
npm i multer
multer 는 multipart form 만 지원함!!
form(method="POST", enctype="multipart/form-data") 으로 form 수정
미들웨어를 만들어야 함
multer 를 임포트하고 uploadFiles 생성 (req, res) 가 아닌 multer 방식 {dest: "uploads/"} 로 upload 폴더에 파일들을 저장
multer 미들웨어는 컨트롤러 전에서 실행 uploadFiles.single("avatar") => 파일 1개를 보내고 "avatar" name 을 가진 input 에서 보냄
이렇게 하면 컨트롤러에서 req.file 사용 가능 req.file 은 업로드한 파일

8-7
컨트롤러에서 유저 업데이트 하는 부분에 avatarUrl 에 file 의 path 를 추가해 줌
근데 만약 사용자가 아바타를 바꾸지 않는다면? => 오류발생 path property 를 읽을 수 없음
session 의 유저에서 아바타 url 을 가져오고 if else 사용
file 이 존재하면 file.path 를 존재하지 않으면 avatarUrl(기존) 을 받음
절대 DB 에 파일을 저장하면 안 됨!!!!!!!!!!!!!!!!!!!!
DB 에는 그 파일의 위치만 저장
edit-profile 템플릿에서 img 태그 추가 소스는 loggedInUser.avatarUrl
엑박이뜸 => 링크를 열어보면 링크가 잘못 됨 /users/uploads/~~~ => /uploads/~~~ 가 되어야지
src 에 "/" + 추가함 근데 그래도 안 됨
왜냐며 express 에게 uplaods 폴더를 만들었다고 말 해준적이 없음

8-8
브라우저가 uploads 폴더의 파일에 접속할 수 있어야함
브라우저가 어떤 페이지와 폴더를 볼 수 있는지 알려줘야함
static files serving 을 설정 => 폴더 전체를 브라우저에게 오픈
server.js 에서 설정 => 해결
문제가 있는데 우리가 파일을 서버에 저장하고 있다는 것 => 서버 닫으면 사라짐
나중에 파일을 우리 서버가 아닌 다른 곳에 저장할 것
절대 DB에 파일을 저장하면 안됨 DB 에는 파일의 위치를 저장

8-9
upload video 템플릿에 비디오를 위한 label, input 을 추가 multer 는 input 의 name 을 받음
multer 의 fileSize 를 사용해서 파일 용량 조절
uploadFiles 라는 하나의 미들웨어를 avatarUpload, videoUpload 라는 2개의 미들웨어로 쪼갬
limits 를 이용해서 파일 크기 조정 (byte) 단위
비디오 업로드 컨트롤러에 fildUrl 도 업로드하게 수정 또한 모델에도 fileUrl 추가
반드시 enctype="multipart/form-data 로 되있어야 동작!
watch 템플릿은 컨트롤러가 보내는 비디오 오브젝트가 존재
src 에 "/" 추가해서 비디오를 나오게 함!
{path: fileUrl} = req.file 을 사용하면 path 의 이름을 바꿔서 저장가능!

8-10
로그인 한 유저의 my profile 로 갈 수 있게 템플릿 수정
url 에 있는 id 로 유저를 찾고 보냄 못 찾으면 404 렌더

8-11
비디오와 유저를 연결
ObjectId 는 자바스크립트 기본이 아니고 mongoose 에서 사용가능
ref 를 mongoose 에게 owner 에 id 를 저장하겠다고 알려주기 위해 사용
User.js 에서 const User = mongoose.model("User", userSchema) 의 "User" 부분과 같은 이름이어야 함
postUpload 에서 owner 도 업로드하게 설정
watch 템플릿에서 오너가 아니라면 edit 과 delete 를 안보이게 설정

8-12
populate 를 이용 postUpload 에 video 에 .populate 하고 owner 를 적으면 owner 오브젝트를 비디오에 추가해 줌
유의해야할 것이 db의 비디오의 owner 는 id 만 있는 String 이고
watch function 에서 video 를 불러올때 populate 를 사용해서 db와는 별개의 객체를 생성하고 그 객체에 owner 객체가 들어있음
owner 의 String id 를 사용하여 ref 인 User 에서 동일한 id 를 찾아 owner 객체를 video 객체에 추가함

이제 User 가 소유한 동영상 목록을 보이게 할 것

8-13
영상을 업로드할때 owner 가 생기고 생겨난 newVideo 의 Id 를 User 의 videos 배열에 추가
populate 사용해서 String id 에서 객체생성하는 새로운 user 객체를 see function 에서 사용
근데 .save 할때마다 비밀번호가 해싱되서 이걸 해결해줘야함

8-14
위에서 말한 버그픽스
비밀번호가 바뀔때만 해쉬하게하면 됨 => isModified("password") 사용해서 true 일때만 해쉬
두번째 버그는 getEdit 컨트롤러에서 발생
영상의 주인에게만 페이지 접속가능하게 수정해야함 postEdit, deleteVideo 에서도 같은 작업필요

9-0~2
프론트엔드 코드를 처리하기위해 webpack 을 사용 여기서는 수동으로 설정해주지만 사실 앵간한 툴들에는 내장되어있음
공부목적으로 수동사용
webpack 환경설정에서는 절대결로만사용해야함
\_\_dirname 은 파일까지의 경로 전체를 의미함 /home/chanhwi/Project/mytube
path.resolve 는 내가 입력하는 파트들을 모아서 경로로 만들어줌
console.log(path.resolve(\_\_dirname, "assets", "js")); => /home/chanhwi/Project/mytube/assets/js
Babel 을 이용하게하고 mode 를 개발모드로 설정

9-3
webpack 으로 프론트를 위한 코드설정
템플릿에 sciprt 불러오고 uploads 에서 한 것 같이 server.js 에서 static 으로 폴더를 볼 수 있게 설정

9-4
css 를 볼 수 있게 webpack 설정 webpack 은 뒤에서부터 실행해서 로더의 순서를 저렇게 함
webpack 이 Js 파일에 css 를 집어넣음!

9-5
css 와 js 를 구분해서 변환하고 추출하고 각각의 경로에 설정
9-6
webpack 설정에서 watch: true 는 콘솔을 게속 실행중 (nodemon) clean: true 는 폴더를 비워주는 역할
프론트 코드를 저장할때 백엔드 서버도 재시작됨
노데몬 설정을 통해 무싷는 기능을 추가 노데몬 설정에서 실행부분을 셋팅해줘서 package.json 에서도 --exec 부분을 삭제
webpack 도 webpack.config.json 이 기본이기에 --config 부분을 지워도 작동함

10 Styles
partials 이나 mixin 을 만들면 client components 에 scss 생성
profile, watch 같은 pug를 만들면 client screens 에 scss 생성

컨트롤러에 populate 사용
double populate => 사용해서 user 의 videos 의 owner 를 populate!

https://sqlplus.tistory.com/entry/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%EC%A0%9C%EC%9E%91%EC%8B%9C-%ED%8A%B9%EC%A0%95-input-%EC%86%8D%EC%84%B1%EC%97%90%EB%A7%8C-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%84-%EC%A7%80%EC%A0%95%ED%95%A0%EB%95%8C-Styling-Texty-Inputs-Only

!! input: not 을 사용할때 니코의 깃허브 소스코드가 아닌
input:not([type="range"]) 로 적어주어야 정상 작동!

11-1 Video Player
webpack 설정으로 videoPlayer.js 도 처리하게 해 줌
https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement
참고해서 이벤트와 메소드사용해서 play pause 버튼 만듬

11-2
Mute and Unmute

11-3
input 에 input 이벤트를 넣고 volumeValue 변수를 만들고해서 볼륨 컨트롤 사용

11-4, 5
loadedmetadata 를 사용해서 시간을 불러 올 수 있음
new Date() 를 사용해서 시간포맷

11-6
Timeline 에 기능추가

11-7
fullscreen
https://developer.mozilla.org/ko/docs/Web/API/Fullscreen_API
element.fullscreenElement 로 풀스크린이 잇는지 없느지 확인해서 코드 작성

11-8
마우스 커서 이벤트 작성
마우스 떠날때 클래스를 지우는건 맞는데 떠나고 바로 들어오면 클래스를 지우기 싫은데 이때도 지워짐 이를 해결해야함
setTimeout 메소드는 특정한 id 를 return 함!!
이 id 를 clearTimeout 이라는 메소드에 넘겨주면 해당 타임아웃이 취소됨!!!

11-9
마우스가 비디오 안에서 가만히 있을땐 다시 컨트롤러를 숨겨줄 것
마우스가 움직일때마다 클래스를 지우는 timeout을 하나 만들고 마우스가 움직일때마다 해당 timeout을 취소시킴
이렇게 하면 마우스가 안 움직이면 타임아웃이 실행되고 컨트롤이 사라짐

12-1, 2, 3 조회수 생성 API VIEW
VIEW API 는 템플릿을 렌더하지 않는 리턴을 보내는데 단지 STATUS 만 보낼 수 있음
그런데 어떻게 프론트엔드에서 URL 이 변하지 않고 API VIEW 에 요청을할까?
videoPlyaer 로 가서 "ended" 이벤트 추가해서 fetch 로 요청을 보내면 됨
그런데 backend 코드가 아닌 front 코드라서 req.params 로 id 를 가져오지 못 하니 요청할 url 을 만들 수 없음
watch 템플릿에는 video 오브젝트가 전해지니 템플릿에서 비디오의 데이터를 HTML 에 저장할 수 있음
HTML 의 data 속성 사용
https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes
비디오 컨테이너에 비디오 아이디를 속성으로 저장함 ID를 받고 FETCH!
그런데 return 할때 status() 만 보내면 응답에 상태코드를 추가하는 개념이고 상태자체를 보내는 것은 아님
즉 현 status 만 보낸다면 아무것도 보내지 않고있는 것
그래서 sendStatus() 를 사용해서 보내야 함
항상 뭔가 끝내는 것이 중요 return 을 해줘서 연결을 끝내야 함

13 - 0, 1 Video Recorder
client 에 recorder.js 만들고 upload 템플릿에서 임포트
https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia

regenerator runtime 을 각각의 js에 임포트할 수도 있지만 main.js 에 임포트하고
base 템플릿에서 main.js 를 불러와 모든 js 에서 regenerator time 이 작동할 수 있게하는게 편리
그런데 나는 안 됨 왜일까!!!

stream 객체를 받고 video 의 srcObject 로 stream 을 넘겨줌
https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
강의에는 없지만 css 를 이용해서 좌우반전 효과를주고 크기를 조절

13-2 Stream 녹화
https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
Media Rocorder 를 사용해서 stream 의 비디오 녹화
버튼 클릭이 아닌 바로 비디오가 보이게하고 버튼은 녹화버튼으로 대체
new MediaRecorder 를 생성하고 stream 을 넘겨주면 됨
recorder event 를 사용해야 제대로 사용가능
recorder.stop() 을 하면 ondataavailable 이벤트가 실행되며 여기서 파일이 딸려나옴
타이머 설정하고 event.data 로 비디오 데이터 받을 수 있음

13-3
stop 을 누르면 레코더를 끝내고 데이터가 생성되면 URL.createObjectUrl() 을 사용해서
브라우저 메모리에서만 사용가능한 URL 을 만들어 줌 => 브라우저의 메모리에 비디오 파일 저장
생성된 비디오 파일로 비디오를 대체하기 위해서 처음에 만든 비디오에서 srcObject 를 비디오 URL 로 대체

13-4
download handler 에 a 를 하나 만들고 videoFIle 을 href로 download property 를 설정해줌
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
a.click() 하면 링크를 클릭한 것 처럼 작동함
webm 확장자로 비디오를 저장 => 확장자는 맘대로

14 FFmpeg
모든 기기들이 webm을 이해하지는 못하기 때문에 모두가 이해하는 webm -> mp4로 변환
WebAssembly 를 이용해서 프론트엔드에서 매우 빠른 코드를 실행할 수 있음
ffmpeg wasm 은 비디오를 변환하기 위해서 사용자의 컴퓨터를 사용
https://github.com/ffmpegwasm/ffmpeg.wasm

ffmpeg 임포트하고 불러옴 이제부터 브라우저가 아닌 FS (파일 시스템을 사용)한다고 상상
강의대로하면 오류남 ffmpeg 버전을 낮춰서 하니 오류 해결
npm install @ffmpeg/ffmpeg@0.9.7 @ffmpeg/core@0.8.5

만든 파일을 읽으면 엄청나게 긴 unsigned int 8 array 가 생김 이것으로 blob 을 생성해야함
https://developer.mozilla.org/ko/docs/Web/API/Blob
blob => binay 정보를 가진 파일
Uint8Array 에서 binary data 에 접근하려면 .buffer 를 사용
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
arraybuffer => 우리의 비디오 데이터
정리하면 데이터를 사용하려면 binary data 를 사용하고싶으면 buffer 를 사용!
Blob 을 만들고 Blob 을 URL 로 생성해 앞에서 만든 a.href 에 저장!

14-3 Thumbnail 썸네일
ffmpeg 사용해서 동일한 방식으로 사진 생성

14-4
속도를 위해서 사용한 URL 들을 revoke 하고
FS 에서 파일들을 unlink 해 줌

14-5
files 객체를 만들어서 string 을 입력할때 오류가 생기는 걸 방지하고
downloadFile 함수를 만들어서 중복되는 a 만들고 클릭하는 부분을 깔끔하게 대체
사용자가 다운로드 이후 다시 다운로드를 클릭하는 것을 방지
이벤트 리스너를 제거하고 텍스트 변환 그리고 .disable = true 로 비활성화
다운로드가 끝난 후 다시 버튼을 활성화 시키고 start 함수로 가는 이벤트를 추가해서 다시 녹화할 수 있게 설정

DB 에 thumbUrl 을 추가하고 템플릿에서 input, label 추가

14-6
https://www.npmjs.com/package/multer
multer 에서 여러개의 파일을 전송 가능 => .filed 를 이용
이렇게 하면 req.file 을 기다리고있는 컨트롤러에서 오류가 발생 req.files 를 사용해야함
req.files 로 하면 배열안의 객체가되서 배열안의 객체를 사용해서 업로드시 fileUrl 과 thumbUrl 수정
믹스인 템플릿에서 style=`` 을 사용해서 생성된 thumbUrl 을 지정
css 를 사용해서 background-position, backgorund-size 를 지정
https://developer.mozilla.org/ko/docs/Web/CSS/background-size
https://developer.mozilla.org/en-US/docs/Web/CSS/background-position

다 하고보니 조회수가 안 올라가서 개고생
fetch(`api/videos/${id}/view`, { method: "POST" });
fetch(`/api/videos/${id}/view`, { method: "POST" }); => / 사용해서 절대 경로로 해줘야함, 숨은그림 찾기 맛집

15 Flash Message
https://www.npmjs.com/package/express-flash
express-flash 모듈을 설치해서 플래시 메시지를 표시해보자
server에 임포트하고 use 사용해서 사용
flash 설치 이후부터 req.flash 라는 함수를 사용가능
req.flash("error", "Not Authorized"); 처음 처음에는 형식 다음에 메시지

기본적으로 req.flash를 사용하면 locals 에 locals.messages.형식 생성 => 템플릿에서 사용 가능
if messages.error
span=messages.error
messages.형식 으로 사용가능
메세지는 한번 보이고 사라지는 일회용 메세지

base에 추가하는대신 flash 를 표시하는 mixin을 만듬
그리고 CSS 를 추가하고 애니메이션을 넣음
keyframes 와 animation, animation-delay 를 적절히 사용

16 Comment 덧글
Comment Model 을 작성 작성날짜, 속한 비디오, 작성자, 내용을 정의
Video 와 User 는 많은 Comment 를 가질 수 있음으로 모델에 Comment 배열을 생성

16-2
client 에 commentSection.js 를 만들고 웹팩에 넣어줌
form, textarea, btn 을 불러오고 이벤트들을 추가
form 안에있는 버튼 or input type="submit" 클릭하면 Form 이 제출되어 페이지가 새로고침 됨 => form 의 submit 이벤트 생성
새로고침을 멈추기 위해서 default behavior 를 멈춤 => event.preventDefault()
어떤 비디오에 댓글을 다는지 알기위해 videoContainer 에서 id를 뽑아옴
이제 backend 에 request 를 보내야함
로그인 안 한 유저들에게는 커멘트 작성 창을 보여주지 않음
이렇게하면 오류가 발생하는데 존재하지 않는 textarea, 버튼을 찾기때문
때문에 form 을 찾고 handleSubmit 안에서 textare 와 버튼을 찾는 방식으로 해결

form 에서 정보를 전달하면 req.body 에 전달되는데 body 를 만들기위해서 꼭 form 이 있어야만 하는 것은 아님
fetch에서 body를 사용해서 데이터를 전달하면 req.body 똑같이 사용가능
콘솔에 req.body 를 찍어보면 {} 로 나옴 우리가 원하는건 text 도 들어있는 {} 를 원함

form 에서 정보를 제공할떄 body로 받을 수 있는 것은 urlencoded 미들웨어 덕분에 가능
이제 서버가 fetch 로 부터 데이터를 이해해야함 보통 fetch 는 JSON 형식으로 데이터를 전송
우리 데이터도 JSON 화 시켜서 전송

브라우저에서 오브젝트를 만들고 전송하면 서버는 이걸 받아서 STRING 으로 만들어버림
NETWORK 탭에서보면 우리가 보낸 TEXT 가 [Object Object] 로 변환되어서 나타남 => obj.toString() 하면 이렇게 나옴
그래서 body 에 obj 이 아닌 text 자체를 보내주면 작동
server 에서 app.use(express.text()); 를 추가하면 body에 있는 text 를 백엔드에서 받을 수 있음!
근데 한가지만 보낼떄는 문제가 없는데 한 가지 이상 (댓글, 평점....) 등을 보낼떄는 object 를 보내야하는데 이럴떄는 작동 안 함
=> [object object] 으로 나오는 것을 string 으로 바꿔줘야함 => JSON.stringify 라는 것을 사용
JS.stringify 는 JS object 를 받아서 string 으로 리턴
body: JSON.stringify({text: "I like it", rating: 5}) => {text: "I like it", rating: 5} 콘솔에 출력
그런데 req.body.text, req.body.rating 으로 꺼내보려면 undefined => 위의 객체처럼 보이는건 사실 객체가 아니라 text(string)
express 는 string 을 JSON 으로 변환해주는 미들웨어가 존재 => app.use(express.json()); 사용시 위의 텍스트를 진짜 JSON 으로 변환해줌
프론트에서는 실제로는 텍스트인 객체에 정보를 담아서 백엔드에 전송하고 백엔드에서는 객체같은 데이터를 실제 객체로 만들어줌
이렇게만하면 안되고 EXPRESS 에게 우리는 TEXT 를 보내느게 아니라 JSON 을 보내고있다고 알려줘야함
=>REQUEST 의 정보를 담고있는 Headers 에 REQUEST 의 CONTENT TYPE 을 지정
=>EXPRESS 에게 우리가 텍스트를 보내고있지만 JSON 텍스트이니 JSON 으로 바꿔서 알아들으라고 하는 것

16-5
모든 백엔드로 보내는 request 는 쿠키와 함께 옴 우리가 쿠키를 보내면 쿠키ID 의 세션을 찾아봄
프론트에서 fetch 로 요청을 보내면 videoController 에서 쓸 무언가가있음 => req.session.user
작성후 textarea 를 비우고 comment 모델을 이용해서 comment 생성

16-6
덧글을 생성하고 생성된 댓글의 id 를 비디오에 넣어줘야함
watch 에서 불러오는 video 에 comments 를 populate 하고 watch 템플릿에서 댓글을 보이게 만듬
그런데 새로운 댓글이 아래로 가고 오래된 댓글이 위로 올라감
pug 는 JS 를 실행가능 video.comments.reverse(); 사용해서 순서를 바꿀 수 있음

16-7
fetch 에 await 가 없으면 페이지가 새로고침될때 요청이 끝나지 않았다면 깔끔하지 않으니 await 추가해줌
fetch를 하면 backend 에서 statusCode 를 return 해줌 이 statusCode 가 성공일때만 댓글을 보여주고싶음
=> fetch 의 Promise Response 를 받아봄 => 안에 status 라는 것이 있고 우리가 지정한대로 성공시 201
=>201 시 템플릿에 덧글이 달린 것 처럼 만듬

addComment 라는 함수를 만들고 videoComments 에 .video\_\_comments 의 ul 을 지정
JS 로 ELEMENT 들을 만들고 HTML 에 표시해서 실시간으로 생성되는 것 처럼 보이게함
그런데 덧글이 새로운 것이 아래로 내려감 => appendChild 대신 prepend 로 넣으면 위로 올라감

16-8 댓글 지우기, Delete Comment
내가 댓글의 주인일때만 X 표시가 보이게 함 => 버튼을 클릭하고 FETCH REQUEST 를 보내느 사람이 댓글의 작성자가 맞는지 체크
FETCH METHOD 에 DELETE 를 사용할 수 있음
댓글을 지우려면 지우려는 댓글의 Id 를 알아야함 실시간이 아닌 생성된 커멘트의 경우 dataset 을 이용해서 알 수 있는데
실시간 가짜 댓글은 그렇게 ID 를 알 수 없음
videoController 에서 댓글을 만들때 statusCode 만 201로 넘겨주는게 아니라 JSON 으로 생성된 댓글의 id 를 넘겨줄 것
백엔드의 response 로 JSON 을 잘 받았는데 어떻게 추출할까? => response 를 콘솔로 찍으면 JSON 이 콘솔에서는 보이지 않음
=> BODY 를 추출해야함 => 그 RESPONSE 의 JSON 을 얻어야 함 => await response.json(); => 사용할 수 있는 객체생김
addComment 함수에 아이디를 반환하고 newComment 에 dataset 을 이용해서 id 를 추가해 줌

=> api fetch 를 할때 백엔드에서 return 을 json 으로 할 수도 있음을 배움

16-9
내가 쓴 댓글에만 X 버튼 출력
X 버튼 누르면 실시간 댓글 사라짐 =) FETCH REQUEST 후에 사라져야 함, METHOD 는 DELETE 로
/api/comments/${commendID} 같은 형식으로 사용 가능
body 필요없이 ID 로 지우는 것이므로 FETCH 에는 내용 크게 없음 URL 에 ID만 전송하면 될 듯
백엔드에서 내가 댓글의 작성자인지 확인하도록 해야함 SESSION 사용하면 될 듯
