// ==========================================================================
// MAIN.JS - PREMIUM INTERACTION CONTROLLER FOR GAME DEPT PR SITE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Sticky Header Scroll Effect
  const header = document.getElementById('main-header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Toggle button icon between 'menu' and 'x'
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        const isMenu = icon.getAttribute('data-lucide') === 'menu';
        icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
        lucide.createIcons();
      }
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
          }
        }
      });
    });
  }

  // 4. Scroll Highlight Navigation (Intersection Observer)
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 5. Curriculum Track Toggle Logic
  const trackButtons = document.querySelectorAll('.tab-btn');
  const timelineTimeline = document.getElementById('curriculum-timeline');

  // Interactive curricula datasets
  const curriculumData = {
    program: [
      {
        year: '1학년',
        title: '개발의 첫걸음 및 기초 기초 체력 배양',
        desc: '게임 개발자로서 갖추어야 할 논리적 사고와 가장 뼈대가 되는 프로그래밍 핵심 기초 지식을 단단하게 구축합니다.',
        subjects: ['C / C++ 프로그래밍 기초', '파이썬을 활용한 문제 해결', '게임학개론 및 시장 트렌드', '이산수학 및 선형대수학 기초']
      },
      {
        year: '2학년',
        title: '게임 엔진 및 컴퓨터 그래픽스 심화',
        desc: 'Unity/Unreal 엔진을 본격적으로 체득하며 컴퓨터 내부에서 화면이 렌더링되는 기술적 메커니즘을 상세히 이해합니다.',
        subjects: ['자료구조 및 알고리즘', 'Unity 2D/3D 게임 제작 실습', 'C# 기반 객체지향 윈도우 프로그래밍', '컴퓨터 그래픽스 및 수학']
      },
      {
        year: '3학년',
        title: '네트워크 게임 서버 및 멀티 플레이어 설계',
        desc: '동시 접속 수만 명을 견딜 수 있는 튼튼한 게임 서버 구축을 배우고, 학과 내 대규모 팀 프로젝트를 시작합니다.',
        subjects: ['윈도우 소켓 네트워크 프로그래밍', 'Unreal Engine C++ 심화', '게임 데이터베이스 및 SQL', '중기 팀 프로젝트 (Game Jam 연동)']
      },
      {
        year: '4학년',
        title: '캡스톤 디자인 및 글로벌 포트폴리오 완성',
        desc: '졸업 후 메이저 게임사와 인디 씬에 곧장 데뷔할 수 있도록 상용화 수준의 마일스톤 빌드를 제작하고 포트폴리오를 다듬습니다.',
        subjects: ['캡스톤 디자인 (1년 장기 프로젝트)', '게임 물리 엔진 활용 및 최적화', '취업 포트폴리오 및 면접 클리닉', '장기 학업 연계 인턴십 (기업 매칭)']
      }
    ],
    design: [
      {
        year: '1학년',
        title: '게임 기획적 발상과 예술 기초',
        desc: '어떻게 게임이 재미있어질 것인가에 대해 논하고, 다양한 비주얼 표현 기법 및 시나리오 글쓰기의 규칙을 다집니다.',
        subjects: ['게임 기획 개론 및 브레인스토밍', '세계관 및 게임 시나리오 작법', '비주얼 스토리텔링 및 드로잉 기초', '콘텐츠 미디어 분석 연구']
      },
      {
        year: '2학년',
        title: '디자인 에디터 스킬업 및 유저 경험 설계',
        desc: '2D/3D 그래픽 리소스를 생성하는 주요 에디터 툴을 완벽히 마스터하고 UI/UX 사용자 동선을 입체적으로 배웁니다.',
        subjects: ['2D 게임 UI/UX 디자인 실무', '3D 그래픽 디자인 기초 (3ds Max)', '레벨 디자인 입문 및 툴 분석', '게임 인터랙션 시각화 분석']
      },
      {
        year: '3학년',
        title: '정교한 월드 설계 및 시네마틱 연출',
        desc: '엔진 내에서 실제로 걷고 뛰며 플레이가 진행되는 맵 구조와 화려한 컷신 연출 기법을 실습하여 게임성을 고도화합니다.',
        subjects: ['3D 월드 빌딩 및 테레인 에디터 활용', '게임 시스템 및 수치 밸런싱 기획', '시네마틱 및 카메라 컷신 연출', '다학제간 팀 프로젝트 (기획/그래픽 주도)']
      },
      {
        year: '4학년',
        title: '포트폴리오 고도화 및 퍼블리싱 비즈니스',
        desc: '최종 런칭을 목표로 FGT(포커스그룹테스트)를 통해 게임성을 다듬고 BM(수익모델) 수립과 스토어 마케팅을 기획합니다.',
        subjects: ['캡스톤 기획/아트 디자인 마일스톤', '게임 비즈니스 모델(BM) 및 마케팅 기획', 'UI/UX 최종 유저 평가 테스트 실무', '글로벌 게임 시장 상용화 전략']
      }
    ]
  };

  trackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Switch active class on tabs
      trackButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const track = btn.getAttribute('data-track');
      renderCurriculum(track);
    });
  });

  function renderCurriculum(track) {
    if (!timelineTimeline || !curriculumData[track]) return;

    // Fade out effect
    timelineTimeline.style.opacity = '0';
    timelineTimeline.style.transform = 'translateY(10px)';
    timelineTimeline.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      let html = '';
      curriculumData[track].forEach((item, index) => {
        html += `
          <div class="timeline-card glass-card" data-year="${index + 1}">
            <div class="year-badge">${item.year}</div>
            <h4>${item.title}</h4>
            <p class="year-desc">${item.desc}</p>
            <ul class="curriculum-list">
              ${item.subjects.map(sub => `<li>${sub}</li>`).join('')}
            </ul>
          </div>
        `;
      });
      timelineTimeline.innerHTML = html;

      // Fade in effect
      timelineTimeline.style.opacity = '1';
      timelineTimeline.style.transform = 'translateY(0)';
    }, 300);
  }

  // 6. FAQ Accordion Logic
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items (Optional, but cleaner UX)
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        faqItem.classList.add('active');
        // Calculate exact scrollHeight of the answer div and set it
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });

  // 7. Student Projects Detail Modal Controller
  const projectDetailBtns = document.querySelectorAll('.project-detail-btn');
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('project-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBodyContent = document.getElementById('modal-body-content');

  // Interactive projects datasets
  const projectsData = {
    aetheria: {
      title: 'Aetheria: 에테리아의 바람',
      tag: 'Unreal Engine 5 | PC RPG',
      desc: '3D 카툰 렌더링 스타일의 대작 오픈월드 액션 RPG입니다. 플레이어는 원소의 조율사 에테르가 되어 타락해버린 정령들의 세계를 정화하기 위한 신비로운 모험을 떠납니다. 6명의 학생이 기획 단계부터 약 10개월 동안 개발하였으며, 뛰어난 완성도로 지스타 2025 학과 공동 부스에서 관람객들로부터 압도적인 호평을 받았습니다.',
      specs: {
        engine: 'Unreal Engine 5.3 (C++)',
        team: '6명 (기획 1, 프로그래머 3, 그래픽 2)',
        features: '실시간 타겟팅 전투 시스템, HLSL 맞춤형 셰이더, FMOD 사운드 가상 믹싱, 스팀 SDK 테스트 완료',
        award: '2025 졸업 전시 캡스톤 디자인 대상'
      },
      class: 'p-aetheria'
    },
    neonrun: {
      title: 'Neon Run: 사이버 러너',
      tag: 'Unity | Mobile 2D',
      desc: '감성적인 사이버펑크 픽셀 그래픽과 업비트 일렉트로닉 음악이 특징인 모바일 2D 플랫포머 러닝 게임입니다. 복잡한 컨트롤 필요 없이 직관적인 터치와 제스처만으로 신나는 스피드감을 극대화했습니다. 실제 Google Play Store 및 Apple App Store에 출시하여 단기간에 글로벌 누적 다운로드 3만 회 이상을 일구어냈습니다.',
      specs: {
        engine: 'Unity (C#)',
        team: '4명 (기획 1, 프로그래머 2, 그래픽 1)',
        features: 'Spine 2D 골격 애니메이션, 절차적 맵 생성 알고리즘, 구글 플레이/게임센터 리더보드 동기화, 모바일 광고 통합',
        award: '스토어 출시작 (다운로드 3만+ 돌파)'
      },
      class: 'p-neonrun'
    },
    shadowescape: {
      title: 'Shadow Escape: 그림자 탈출',
      tag: 'Unity | VR Puzzle',
      desc: 'Meta Quest 3 VR 기기에 특화된 몰입형 1인칭 공간 탈출 퍼즐 게임입니다. 빛과 그림자의 굴절율을 역이용하여 밀폐된 신전 내부의 장애물들을 치우며 탈출 경로를 찾아내는 신선한 아이디어가 담겨 있습니다. 물리 엔진을 극도로 제어하여 손 모양 손가락 마디마디 트래킹(Hand Tracking)을 정밀하게 가공했습니다.',
      specs: {
        engine: 'Unity (C#) / OpenXR',
        team: '3명 (기획 1, 프로그래머 2)',
        features: 'Meta XR Core SDK 정밀 핸드트래킹 통합, 완전 실시간 물리 퍼즐 기믹 연산, 3D 오디오 잔향 시스템',
        award: '2025 학과 하반기 게임잼 최우수상'
      },
      class: 'p-shadowescape'
    }
  };

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal || !modalBodyContent) return;

    modalBodyContent.innerHTML = `
      <div class="modal-media-placeholder ${data.class}"></div>
      <h3 class="modal-project-title">${data.title}</h3>
      <span class="badge neon-pulse modal-project-badge">${data.tag}</span>
      <p class="modal-desc">${data.desc}</p>
      
      <div class="modal-tech-specs">
        <h4><i data-lucide="cpu" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;color:#00f5d4;"></i>기술 사양 및 성과</h4>
        <ul class="spec-list">
          <li><strong>개발 엔진:</strong> ${data.specs.engine}</li>
          <li><strong>개발 인원:</strong> ${data.specs.team}</li>
          <li><strong>핵심 기술:</strong> ${data.specs.features}</li>
          <li><strong>수상/성과:</strong> ${data.specs.award}</li>
        </ul>
      </div>
    `;

    // Initialize lucide icons injected dynamically inside the modal
    lucide.createIcons();

    // Show modal
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock body scroll
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock body scroll
  }

  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  const modalCloseBtn = document.getElementById('project-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  
  // Custom close button click on the modal top right corner
  const closeIconBtn = document.getElementById('modal-close');
  if (closeIconBtn) {
    closeIconBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Close modal with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 8. Premium Custom Tech Cursor Tracking Logic (Modern Fluid Lerp Cursor)
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  
  if (cursor && cursorDot && window.innerWidth > 1024) {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    // Track target mouse coordinates
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update Dot instantly for razor-sharp, zero-delay responsiveness
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
    });
    
    // Lerp (Linear Interpolation) loop for the outer ring's smooth lag & easing inertia
    function updateRingCursor() {
      // 0.15 Lerp factor provides an extremely organic, modern easing effect
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;
      
      requestAnimationFrame(updateRingCursor);
    }
    // Initialize loop
    requestAnimationFrame(updateRingCursor);
    
    // High-performance event delegation for hover interaction on all current & dynamic elements
    document.addEventListener('mouseover', (e) => {
      const hoverTarget = e.target.closest('a, button, select, input, textarea, .tab-btn, .project-detail-btn, .btn, .logo, [role="button"]');
      if (hoverTarget) {
        document.body.classList.add('cursor-hover');
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      const hoverTarget = e.target.closest('a, button, select, input, textarea, .tab-btn, .project-detail-btn, .btn, .logo, [role="button"]');
      if (hoverTarget) {
        document.body.classList.remove('cursor-hover');
      }
    });
    
    // Clicking state visual feedback
    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-clicking');
    });
    
    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-clicking');
    });

    // Handle mouse leaving the window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
      document.body.classList.remove('cursor-hover', 'cursor-clicking');
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  }
});
