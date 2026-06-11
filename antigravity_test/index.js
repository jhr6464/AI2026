// index.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // ----------------------------------
  // 슬라이드 관련 로직 (발표 모드)
  // ----------------------------------
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("slideDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let currentSlide = 0;

  // 동적으로 닷트 네비게이션 생성
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("slide-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slide-dot");

  function updateSlideControls() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
        dots[index].classList.add("active");
      } else {
        slide.classList.remove("active");
        dots[index].classList.remove("active");
      }
    });

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
  }

  function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
      currentSlide = index;
      updateSlideControls();
    }
  }
  window.goToSlide = goToSlide;

  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // 키보드 조작 기능 추가
  document.addEventListener("keydown", (e) => {
    if (body.classList.contains("mode-presentation")) {
      if (e.key === "ArrowRight" || e.key === "Space") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    }
  });

  updateSlideControls();

  // ----------------------------------
  // 이미지 갤러리/탭 로직
  // ----------------------------------
  const tabs = document.querySelectorAll(".gallery-tab");
  const images = document.querySelectorAll(".gallery-img");

  function switchTab(targetTab) {
    const filter = targetTab.getAttribute("data-target");
    
    tabs.forEach(tab => {
      if (tab === targetTab) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    images.forEach(img => {
      if (img.id === filter) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab));
  });

  // ----------------------------------
  // 테이블 데이터 필터링 로직
  // ----------------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const tableRows = document.querySelectorAll(".data-table tbody tr");

  function filterTable(filterValue) {
    tableRows.forEach(row => {
      const gender = row.getAttribute("data-gender");
      if (filterValue === "all" || gender === filterValue) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.getAttribute("data-filter");
      filterTable(filter);
    });
  });
});
