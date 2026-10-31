const SERVICE_KEY = "ae396a7866616358861e3caa7ff6eb1c89e0b17b464df99891bf232ea530dc47";
const API_URL = `https://apis.data.go.kr/B551011/KorPetTourService2/areaBasedList2?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&numOfRows=20&pageNo=1`;

async function fetchPetPlaces() {
  const cardGrid = document.getElementById("cardGrid");
  if (!cardGrid) return;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    const items = data.response?.body?.items?.item;
    
    if (!items || items.length === 0) {
      cardGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888;'>조회된 데이터가 없습니다.</p>";
      return;
    }

    cardGrid.innerHTML = "";

    items.forEach(place => {
      const card = document.createElement("div");
      card.className = "card";
      
      // 전화번호가 있는 경우에만 전화번호 표시, 없으면 숨김
      const telHtml = place.tel ? `<p>📞 ${place.tel}</p>` : '';

      card.innerHTML = `
        <div class="card-body">
          <span class="badge">반려동물 동반</span>
          <h3>${place.title || '상호명 없음'}</h3>
          <p>📍 ${place.addr1 || '주소 정보 없음'}</p>
          ${telHtml}
        </div>
      `;

      // 카드를 누르면 상세 페이지로 데이터와 함께 확실하게 이동
      card.addEventListener("click", () => {
        const title = place.title || '';
        const addr = place.addr1 || '';
        const tel = place.tel || '';
        location.href = `detail.html?title=${encodeURIComponent(title)}&addr=${encodeURIComponent(addr)}&tel=${encodeURIComponent(tel)}`;
      });

      cardGrid.appendChild(card);
    });

  } catch (error) {
    console.error("데이터를 불러오는 중 에러가 발생했습니다:", error);
    cardGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #ff6b6b;'>데이터를 불러오지 못했습니다.</p>";
  }
}

window.addEventListener("DOMContentLoaded", fetchPetPlaces);
