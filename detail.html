// 공공데이터포털 인증키가 적용된 코드입니다
const SERVICE_KEY = "ae396a7866616358861e3caa7ff6eb1c89e0b17b464df99891bf232ea530dc47";
const API_URL = `https://apis.data.go.kr/B551011/KorPetTourService2/areaBasedList2?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&numOfRows=20&pageNo=1`;

async function fetchPetPlaces() {
  const cardGrid = document.getElementById("cardGrid");
  if (!cardGrid) return;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // API 응답 구조에서 데이터 아이템 추출
    const items = data.response?.body?.items?.item;
    
    if (!items || items.length === 0) {
      cardGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888;'>조회된 데이터가 없습니다.</p>";
      return;
    }

    cardGrid.innerHTML = ""; // 기존 내용 초기화

    items.forEach(place => {
      const card = document.createElement("div");
      card.className = "card";
      
      card.innerHTML = `
        <div class="card-body">
          <span class="badge">반려동물 동반</span>
          <h3>${place.title || '상호명 없음'}</h3>
          <p>📍 ${place.addr1 || '주소 정보 없음'}</p>
          <p>📞 ${place.tel || '전화번호 없음'}</p>
        </div>
      `;

      // 카드를 누르면 상세 페이지로 이동하도록 연결
      card.addEventListener("click", () => {
        location.href = `detail.html?title=${encodeURIComponent(place.title)}&addr=${encodeURIComponent(place.addr1)}&tel=${encodeURIComponent(place.tel)}`;
      });

      cardGrid.appendChild(card);
    });

  } catch (error) {
    console.error("데이터를 불러오는 중 에러가 발생했습니다:", error);
    cardGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #ff6b6b;'>데이터를 불러오지 못했습니다.</p>";
  }
}

// 페이지가 로드되면 데이터를 불러옵니다
window.addEventListener("DOMContentLoaded", fetchPetPlaces);
