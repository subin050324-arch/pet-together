const SERVICE_KEY = "ae396a7866616358861e3caa7ff6eb1c89e0b17b464df99891bf232ea530dc47";
// 한국관광공사 고캠핑(인기 캠핑장) 기반 API
const API_URL = `https://apis.data.go.kr/B551011/KorCampingService/basedList?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&numOfRows=30&pageNo=1`;

let allCampItems = [];

async function fetchCampingPlaces() {
  const cardGrid = document.getElementById("cardGrid");
  if (!cardGrid) return;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    allCampItems = data.response?.body?.items?.item || [];
    
    if (allCampItems.length === 0) {
      cardGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888;'>조회된 데이터가 없습니다.</p>";
      return;
    }

    displayCards(allCampItems);

  } catch (error) {
    console.error("데이터 로딩 에러:", error);
    cardGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #ff6b6b;'>데이터를 불러오지 못했습니다.</p>";
  }
}

function displayCards(items) {
  const cardGrid = document.getElementById("cardGrid");
  cardGrid.innerHTML = "";

  items.forEach(place => {
    const card = document.createElement("div");
    card.className = "card";
    
    // 썸네일 사진이 없는 경우 기본 대체 이미지 처리
    const imgSrc = place.firstImageUrl ? place.firstImageUrl : 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop&q=60';
    
    card.innerHTML = `
      <img src="${imgSrc}" class="card-img" alt="캠핑장 이미지" onerror="this.src='https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop&q=60'">
      <div class="card-body">
        <span class="badge">오토캠핑 / 차박</span>
        <h3>${place.facltNm || '캠핑장 이름 없음'}</h3>
        <p>📍 ${place.addr1 || '주소 정보 없음'}</p>
        <p>📞 ${place.tel || '문의 전화 없음'}</p>
      </div>
    `;

    // 클릭 시 상세 페이지로 데이터 전달
    card.addEventListener("click", () => {
      const name = encodeURIComponent(place.facltNm || '');
      const addr = encodeURIComponent(place.addr1 || '');
      const tel = encodeURIComponent(place.tel || '');
      const img = encodeURIComponent(place.firstImageUrl || '');
      const env = encodeURIComponent(place.indutype || place.lctCl || '');
      
      location.href = `detail.html?name=${name}&addr=${addr}&tel=${tel}&img=${img}&env=${env}`;
    });

    cardGrid.appendChild(card);
  });
}

// 실시간 검색 기능 구현
document.addEventListener("DOMContentLoaded", () => {
  fetchCampingPlaces();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase();
      const filtered = allCampItems.filter(item => {
        const name = (item.facltNm || '').toLowerCase();
        const addr = (item.addr1 || '').toLowerCase();
        return name.includes(keyword) || addr.includes(keyword);
      });
      displayCards(filtered);
    });
  }
});
