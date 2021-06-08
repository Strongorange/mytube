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
