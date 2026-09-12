'use strict';
const $ = (s) => document.querySelector(s);
const home = $('#home-view');
const detail = $('#detail-view');
const header = $('#header');
const menu = $('#menu');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const pages = {
  '/work/ai-car': {
    title: '开个啥。', category: 'AI PRODUCT / AI 选车小程序',
    lead: '把模糊的购车需求，转化为清晰、可解释的车型建议。',
    cover: 'car-life.jpg', image: 'ai-car-advisor.jpg', alt: '开个啥 AI 选车小程序完整首页', caption: '现有产品界面，来自原个人主页。',
    stats: [['2,657','款车型'],['172','个品牌'],['75','项数据维度']],
    blocks: [['从真实需求出发','选车时，预算只是起点。开个啥希望帮助用户找到最适合自己的车，而不只是最贵的车。'],['用 AI 连接需求与选择','围绕车型数据和用户需求，把宽泛的问题变成更容易理解的建议。这是我将汽车兴趣与 AI 产品实践结合的一次尝试。']],
    note: '案例页待补充：我负责的部分、关键决策、产品演示，以及经过验证的用户反馈。',
    next: '/work/study', nextLabel: '下一件作品 / 伴学工作台', returnId: 'work'
  },
  '/work/study': {
    title: '伴学工作台。', category: 'AI / LEARNING WORKSPACE',
    lead: '围绕个体教师的一对一教学，把任务、作答、反馈、修改和周报组织成可以持续回看的过程。',
    cover: 'study-workspace.jpg', image: 'study-workspace.jpg', alt: '五个相互连接的学习记录面板概念配图', caption: 'AI 生成的概念配图，非实际产品界面。',
    process: ['任务', '作答', '反馈', '修改', '周报'],
    blocks: [['希望处理的问题','教学中的任务编排和记录整理往往重复发生。工作台围绕这些具体动作组织页面，让教师和学习者能够看见正在做什么、下一步是什么，以及之前留下了哪些记录。'],['设计取舍','模型生成的内容先作为候选，正式学习记录与教师复核分开处理。作答、反馈和修改之间保留联系，周报围绕记录过的学习过程展开。'],['当前状态','项目处于受控测试阶段，适合使用测试资料体验流程。真实教学效果及部分账号权限验收仍待继续核验。']],
    next: '/work/ai-car', nextLabel: '另一件作品 / 开个啥', returnId: 'work'
  },
  '/about': {title: "Hi, I'm Brody Zheng", returnId: 'about'},
  '/life/golf': {
    title: '找到节奏。', category: 'BEYOND WORK / GOLF',
    lead: '把注意力放在每一次挥杆，也放在每一次判断背后的依据。',
    cover: 'golf-life.jpg', image: 'golf-life.jpg', alt: '高尔夫练习场与球具', caption: '高尔夫 / 专注、判断与复盘',
    blocks: [['把注意力放回当下','我享受高尔夫带来的专注。在学习与做项目之外，它给了我调整节奏的空间。一次挥杆的结果很直观，但结果背后的原因并不总是清楚：动作、节奏、环境，以及当时做出的选择，都值得回头想一想。'],['让 AI 帮助提出更好的问题','我感兴趣的一种应用，是让 AI 协助整理练习笔记和视频中的观察，把零散的感受变成可以比较的问题：这一次尝试改变了什么？哪些情况反复出现？比起直接给动作打分，我更希望它帮助我带着明确的问题，去练习、请教和验证。'],['从一次表现，看向长期过程','这也影响了我对 AI 产品的想法：一次回答听起来合理，并不等于长期有效。记录背景、保留前后的变化，让使用者能回看和判断，比给出一个看似确定的结论更有价值。这是我想继续探索的方向。']],
    next: '/life/fitness', nextLabel: '继续探索 / 健身', returnId: 'life'
  },
  '/life/fitness': {
    title: '一点点，更进一步。', category: 'BEYOND WORK / FITNESS',
    lead: '把坚持放进日常，让变化留下可以回看的记录。',
    cover: 'fitness-squat.jpg', image: 'fitness-training.jpg', alt: '郑策在健身房进行哑铃训练', caption: '健身 / 训练中的专注',
    blocks: [['在重复中积累变化','健身让我从屏幕前抽离，把注意力放到身体和当下。它吸引我的地方，是进步通常来自一次次普通的练习，而不是某一次突然的突破。持续投入、观察状态、适时调整，这种节奏也和学习新工具、推进一个项目很相似。'],['我想让 AI 帮忙整理什么','训练动作、重量、次数和自己的感受，单独看都只是零散信息。我想探索 AI 如何把这些记录组织起来，帮助回顾一段时间做过什么、哪些记录缺失、下一次有哪些问题值得关注。先把过程看清楚，再讨论调整，才有具体的依据。'],['记录可以辅助，感受仍然重要','我更希望 AI 扮演整理和提醒的角色，让记录更容易坚持，让复盘更有针对性。身体的实际感受、动作学习和与教练的沟通，也应该保留在判断中。对我来说，实用的技术应该帮助人理解自己的过程，而不是让人只追着一个数字走。']],
    next: '/life/cars', nextLabel: '继续探索 / 汽车', returnId: 'life'
  },
  '/life/cars': {
    title: '始于热爱。', category: 'BEYOND WORK / AUTOMOTIVE',
    lead: '从设计与驾驶体验出发，理解不同的人为什么做出不同的选择。',
    cover: 'hero-forest-wide.png', image: 'car-life.jpg', alt: '郑策在汽车展厅观察跑车', caption: '汽车 / 从兴趣出发，观察真实需求',
    blocks: [['每一辆车，都是一种取舍','汽车吸引我的，不只有外形和性能。同样是出行，有人关注空间，有人在意操控，也有人看重使用成本与日常便利。观察不同车型，让我习惯从具体场景出发，理解产品为什么这样设计，以及它适合怎样的人。'],['从参数，走向人的需求','这种兴趣也是开个啥 AI 选车小程序的起点。车型信息很多，但参数多不一定意味着更容易选择。我希望 AI 能帮助梳理预算、用车场景和个人偏好，把不同选项的理由与取舍讲清楚，让用户有依据地比较。'],['让建议能够被理解和追问','我尤其关注建议背后的信息：它依据什么，忽略了什么，哪些地方需要进一步确认。汽车让我看到，实用的 AI 应用需要连接信息与现实体验。把复杂信息组织好，让人保留判断和选择的空间，是我想持续练习的产品能力。']],
    gallery: [{image:'cars-classic.jpg',alt:'展厅中的深绿色经典保时捷跑车',caption:'设计 / 经典车身的线条与比例'}, {image:'cars-track.jpg',alt:'停放在车棚下的白色赛道风格跑车',caption:'性能 / 围绕驾驶场景做出的取舍'}, {image:'cars-character.jpg',alt:'庭院中装饰着花朵的粉色出租车',caption:'场景 / 汽车也可以成为表达与体验的一部分'}],
    next: '/life/golf', nextLabel: '继续探索 / 高尔夫', returnId: 'life'
  }
};
let observer;
function observeReveals() {
  observer?.disconnect();
  if (!('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  document.body.classList.add('motion-ready');
}
function renderRoute() {
  const hash = location.hash.slice(1);
  const aboutSection = hash.startsWith('/about/') ? hash.slice('/about/'.length) : '';
  const isAbout = hash === '/about' || ['intro','journey','education','interests'].includes(aboutSection);
  const page = isAbout ? pages['/about'] : pages[hash];
  if (menu.open) menu.close();
  if (page) {
    home.hidden = true;
    if (isAbout) {
      if (detail.dataset.page !== 'about') detail.replaceChildren($('#about-page').content.cloneNode(true));
    } else detail.innerHTML = `<section class="detail-hero"><img src="assets/${page.cover}" alt=""><a class="back-link" href="#${page.returnId}">← 返回${page.returnId==='work'?'精选作品':page.returnId==='life'?'生活之外':'关于我'}</a><p class="eyebrow">${page.category}</p><h1 id="detail-title" tabindex="-1">${page.title}</h1><p class="detail-lead">${page.lead}</p></section><div class="detail-body section-wrap"><div>${page.stats?`<div class="detail-stats">${page.stats.map(s=>`<div><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join('')}</div>`:''}${page.blocks.map((b,i)=>`<section class="detail-block"><p class="eyebrow">0${i+1}</p><h2>${b[0]}</h2><p>${b[1]}</p></section>`).join('')}${page.note?`<p class="draft-note">${page.note}</p>`:''}<a class="next-story" href="#${page.next}">${page.nextLabel}<span aria-hidden="true">↗</span></a></div><div class="detail-aside"><figure class="detail-media"><img src="assets/${page.image}" alt="${page.alt}"><figcaption>${page.caption}</figcaption></figure>${page.process?`<div class="learning-process"><p class="eyebrow dark">可回看的学习过程</p><ol>${page.process.map((step,i)=>`<li><span>0${i+1}</span>${step}</li>`).join('')}</ol><p>AI 候选内容 · 教师复核 · 正式学习记录</p></div>`:''}</div></div>${page.gallery?`<section class="story-gallery section-wrap" aria-label="汽车照片精选"><div class="section-heading"><div><p class="eyebrow dark">A FEW THINGS THAT CAUGHT MY EYE</p><h2>镜头里的不同可能。</h2></div></div><div class="story-gallery-grid">${page.gallery.map(photo=>`<figure class="reveal"><img src="assets/${photo.image}" alt="${photo.alt}" loading="lazy"><figcaption>${photo.caption}</figcaption></figure>`).join('')}</div></section>`:''}`;
    detail.dataset.page = isAbout ? 'about' : hash;
    detail.hidden = false;
    document.title = page.title+' — 郑策 BRODY ZHENG';
    if (aboutSection && isAbout) {
      document.getElementById('profile-'+aboutSection).scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
    } else {
      window.scrollTo({top:0,behavior:'instant'});
      $('#detail-title').focus({preventScroll:true});
    }
  } else {
    const wasDetail = !detail.hidden;
    home.hidden = false;
    detail.hidden = true;
    document.title = '郑策 Brody Zheng — 从不同视角，找到新的可能。';
    const targets = ['top','work','about','life','contact','main'];
    const target = targets.includes(hash) ? document.getElementById(hash) : document.getElementById('top');
    if (wasDetail || hash.startsWith('/')) {
      target.scrollIntoView({behavior:'instant'});
      const heading = target.querySelector('h1,h2');
      if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
    } else if(hash && targets.includes(hash)) {
      target.scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
    }
  }
  observeReveals();
  updateMotion();
}
$('#menu-toggle').addEventListener('click',()=>menu.showModal());
$('#menu-close').addEventListener('click',()=>menu.close());
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.close()));
window.addEventListener('hashchange',renderRoute);
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(link && link.getAttribute('href')===location.hash){event.preventDefault();renderRoute();}
});
let scheduled=false;
function updateMotion() {
  scheduled=false;
  const y=window.scrollY;
  header.classList.toggle('solid', y>70 || !detail.hidden);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  header.style.setProperty('--progress',max>0?y/max:0);
  if(reduced.matches) return;
  if (!home.hidden) {
  const track=$('.hero-track');
  const heroRange=Math.max(1,track.offsetHeight-window.innerHeight);
  const p=Math.min(1,Math.max(0,y/heroRange));
  const maxInset=window.innerWidth<700?12:30;
  const frame=$('.hero-frame');
  frame.style.setProperty('--hero-inset',`${p*maxInset}px`);
  frame.style.setProperty('--hero-radius',`${p*12}px`);
  frame.style.setProperty('--hero-scale',1+p*.025);
  frame.style.setProperty('--hero-shift',`${p*4}px`);
  frame.style.setProperty('--copy-shift',`${-p*34}px`);
  frame.style.setProperty('--copy-opacity',1-p*.22);
  }
  document.querySelectorAll('[data-parallax]').forEach(img=>{
    const rect=img.parentElement.getBoundingClientRect();
    if(rect.height>0 && rect.top<window.innerHeight && rect.bottom>0) {
      const progress=(window.innerHeight-rect.top)/(window.innerHeight+rect.height);
      img.style.transform=`translateY(${(progress-.5)*65}px)`;
    }
  });
}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateMotion)}},{passive:true});
window.addEventListener('resize',updateMotion);
reduced.addEventListener('change',updateMotion);
renderRoute();
observeReveals();

// Copy only the contact handle explicitly requested by the visitor.
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = $('#copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      status.textContent = `已复制：${button.dataset.copy}`;
    } catch {
      status.textContent = `请长按或选中账号复制：${button.dataset.copy}`;
    }
  });
});
