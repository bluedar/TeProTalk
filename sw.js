// const CACHE_NAME = "pwa-offline-v1"; //캐싱스토리지에 저장될 파일이름
// const fileToCache = ["/", "/css/style.css"];

//서비스워커 설치(웹자원 캐싱)
self.addEventListener("install", function (e) {
  //서비스워커에서 self는 window와 같은 의미(페이지에서 윈도우를 감지)

  //waitUntil() -()안의 로직이 끝나기 전까지는 이벤트가 끝나지않음
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(fileToCache);
      })
      .catch((error) => {
        return console.log("에러발생", error);
      })
  );

  // 서비스워커 설치후 네트워크 요청이 있을때는 개쉬로 돌려줌

  //서비스워커 활성화 및 업데이트
});

//네트워크 요청이 있을때 캐쉬로 돌려줌
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches
      .match(e.request)
      .then((response) => {
        return response || fetch(e.request);
      })
      .catch((error) => {
        return console.log("에러발생", error);
      })
  );
});

/*
  respondWith()-fetch이벤트에 대한 응답결과를 주는 매소드
  caches.match(e.request) - 같은 리퀘스트가 있는지 찾아봄
  return response - 같은게 있으면 리스폰스를 그래도 리턴(갯에서 가져옴)or 없으면 서버에서(네트워크 가져옴)
*/

const CACHE_NAME = "pwa-offline-v2";
const fileToCache = ["/", "/css/reset.css", "/js/main.js"];

// 작동되고 있는 서비스워커가 달라졌을때 새로 업데이트
// 서브시워커 활성화 및 업데이트

self.addEventListener("active", function (e) {
  const newCacheList = ["pwa-offline-v2"];

  e.waitUntil(
    caches
      .keys()
      .then((catchList) => {
        return Promise.all(
          catchList.map((cacheName) => {
            if (newCacheList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .catch((error) => {
        return console.log("에러발생ㅠㅠ", error);
      })
  );
});
/*
  caches.keys() -캐시스토리지 아이템들의 name (목록확인)-array
  f(newCacheList.indexOf(cacheName) === -1)   - 새로운 캐시리스트에 같은 이름이 없다는 뜻
*/
