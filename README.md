# ThingsFlowCloneApp API
> 헬로우봇 클론 api 입니다.


## Tech/framework used
- [Typescript](https://www.typescriptlang.org)
- [express](https://github.com/oakserver/oak)
- [pg](https://github.com/oakserver/oak)


## Prerequisites
* [Nodejs](https://deno.land/)
* [PostgreSQL](https://developer.riotgames.com/docs/portal)
* [Postman](https://code.visualstudio.com/) (for run testcode)


## Run
0. postgreSQL Database 를 만들어 주세요
1. ```.env.production``` 파일에 postgreSQL DB 정보들로 채워주세요
2. Run :
```sh
npm install
```
3. Run :
```sh
npm start
```


## List of API call
### 1. 콘텐츠 사용 API
  시나리오에 맞는 콘텐츠데이터를 불러옵니다.

* **URL**
  /api/content

* **Method:**
  `GET`
  
*  **URL Params**
   * **Required:**
    `type=[string]`
    `phase=[number]`
   * **Optional:**
    `response=[string]`

* **Data Params**
  None

* **Success Response:**
  * **Code:** 200 
  * **Content:** `Content`(application/json)
 ```typescript
 interface Content { 
   // List of champion's name
   content: string;
 }
 ```
* **Error Response:**
  * **Code:** 400 or 500
  * **Content:** `ErrorResponse`(application/json)
```typescript
interface ErrorResponse {
  message: string,
}
```

### 2. 콘텐츠 제작 API
  콘텐츠 제작을 위한 API

* **URL**
  /api/content

* **Method:**
  `POST`
  
*  **URL Params**
   * **Required:**
      None

* **Data Params**
 * **Required:**
    `type=[string]`
    `phase=[number]`
    `content=[string]`
   * **Optional:**
    `response=[string]`

* **Success Response:**
  * **Code:** 200 
  * **Content:** NONE

* **Error Response:**
  * **Code:** 400 or 403 or 500
  * **Content:** `ErrorResponse`(application/json)
```typescript
interface ErrorResponse {
  message: string,
}
```

#### Anything else that seems useful
- 실행하기전 꼭 db세팅이 필요합니다.
- postman 테스트 코드 작성이 처음이라 퀄리티가 그리 높지않지않습니다.
<!-- Markdown link & img dfn's -->

