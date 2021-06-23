# Test Project Search (뉴스 검색 및 클립 기능)

# 설치

$ yarn

brew install yarn

$ cd ios && pod install && cd ..
$ yarn ios

$ yarn android

# 설명

-   검색화면 SearchScreen
    -   FlatList 컴포넌트로 infinite scroll 구현
    -   WebView 컴포넌트로 인앱 웹뷰 구현
-   클립화면 ClipScreen

-   Redux 액션 정리 ./src/action/search.ts
-   Redux 리듀서 정리 ./src/reducer/search.ts

-   로컬스토리지 연동 ./src/storage/search.ts
-   뉴욕타임스 검색 API 관리 ./lib/api.ts

-   네비게이터 설정 ./src/navigator/HomeNavigator
