# Test Project Search (뉴스 검색 및 클립 기능)

# 설치

$ yarn

# yarn

brew install yarn

# IOS의 경우

$ cd ios && pod install && cd ..
$ yarn ios

# Android의 경우

$ yarn android

# 설명

-   네비게이터 컨테이너 (HomeNavigator) 내부의 검색 화면(SearchScreen)과 클립 화면(ClipScreen)으로 구성
-   각 화면은 개별 리듀서(searchReducer, clipReducer)를 가지고 있고 combineReducer로 통합하여 하나의 스토어로 사용
-   검색화면
    -   상단에 위치한 TextInput 컴포넌트로 검색어 입력
    -   TextInput 컴포넌트
