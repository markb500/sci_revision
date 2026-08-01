// js/app.js
import { registry } from './registry.js';
import * as utils from './utils.js';

const topicMap = {
  Vectors: 'vectors',
  'Moments & C of G': 'momentcofg',
  Pressure: 'pressure',
  'Linear Motion': 'linmot',
  'Angular Motion': 'angmot',
  Machines: 'machines',
  'Energy & Power': 'energy',
  Friction: 'friction'
};

let currentSumData = null;
let views = 0;
let SolnWin = null;

document.addEventListener('DOMContentLoaded', () => {
  utils.loadImages();
  initSecretCode();

  document.querySelectorAll('.topic-btn').forEach((btn) => {
    btn.addEventListener('click', () => generateQuestion(btn.dataset.topic));
  });

  if (!new URLSearchParams(window.location.search).get('test')) {
    const qEl = document.getElementById('q');
    if (qEl) {
      qEl.innerHTML =
        'Click a button to select the type of question. ' +
        'Each click will generate a new question.<br>' +
        "Clicking 'solution' will reveal a step-by-step solution.";
    }
  }

  const solnBtn = document.getElementById('btnSoln');
  if (solnBtn) solnBtn.addEventListener('click', toggleSolution);

  const showHow = document.getElementById('btnShowhow');
  if (showHow) {
    showHow.addEventListener('click', () => {
      if (typeof window.animsel === 'function') window.animsel();
    });
  }

  const colourSelect = document.getElementById('colourSelect');
  if (colourSelect) {
    colourSelect.addEventListener('change', () => {
      document.querySelector(':root').style.setProperty('--bgcolour', colourSelect.value);
    });
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('test') === '1') {
    runTestMode();
  }
});

function generateQuestion(topic) {
  currentSumData = registry.get(topic).generate();

  document.getElementById('q').innerHTML = currentSumData.question;
  document.getElementById('a').innerHTML = '';
  document.getElementById('a').style.visibility = 'hidden';

  const notes = document.getElementById('noteslink');
  if (notes) {
    notes.href = currentSumData.notesLink || '#';
    notes.style.visibility = 'visible';
  }
  const formulas = document.getElementById('formulas');
  if (formulas) formulas.style.visibility = 'visible';

  const canvas = document.getElementById('myCanvas');
  const canvas2 = document.getElementById('myCanvas2');
  const stack = document.getElementById('canvasStack');

  function sizeStack(w, h) {
    if (stack) {
      stack.style.width = w + 'px';
      stack.style.height = h + 'px';
    }
  }

  if (currentSumData.canvas && !currentSumData.canvas.withSolution) {
    // Diagram shown with the question only
    canvas.height = currentSumData.canvas.height;
    canvas.width = currentSumData.canvas.width;
    sizeStack(canvas.width, canvas.height);
    currentSumData.canvas.draw(canvas.getContext('2d'));
    if (canvas2) {
      canvas2.height = 0.5;
      canvas2.width = 0.5;
      canvas2.style.visibility = 'hidden';
    }
  } else if (currentSumData.canvas && currentSumData.canvas.withSolution) {
    // Question diagram on canvas; solution diagram overlaid on canvas2 when revealed
    const w = currentSumData.canvas.width;
    const h = currentSumData.canvas.height;
    sizeStack(w, h);
    if (currentSumData.canvas.questionDraw) {
      canvas.height = h;
      canvas.width = w;
      currentSumData.canvas.questionDraw(canvas.getContext('2d'));
    } else {
      canvas.height = 0.5;
      canvas.width = 0.5;
    }
    if (canvas2) {
      canvas2.height = 0.5;
      canvas2.width = 0.5;
      canvas2.style.visibility = 'hidden';
    }
  } else {
    canvas.height = 0.5;
    canvas.width = 0.5;
    sizeStack(0.5, 0.5);
    if (canvas2) {
      canvas2.height = 0.5;
      canvas2.width = 0.5;
      canvas2.style.visibility = 'hidden';
    }
  }

  const showHow = document.getElementById('btnShowhow');
  if (showHow) showHow.style.visibility = 'hidden';

  utils.eqnformat('q');
  views = 0;
  updateViewCount();
  document.getElementById('btnSoln').style.visibility = 'visible';
}

function toggleSolution() {
  const aDiv = document.getElementById('a');
  const canvas = document.getElementById('myCanvas');
  const canvas2 = document.getElementById('myCanvas2');
  const showHow = document.getElementById('btnShowhow');

  if (aDiv.style.visibility === 'hidden' || aDiv.innerHTML === '') {
    aDiv.innerHTML = currentSumData.solution;
    aDiv.style.visibility = 'visible';
    utils.eqnformat('a');
    views++;
    updateViewCount();

    if (currentSumData.canvas && currentSumData.canvas.withSolution) {
      // Overlay solution diagram on top of question diagram
      const w = currentSumData.canvas.width;
      const h = currentSumData.canvas.height;
      const stack = document.getElementById('canvasStack');
      if (stack) {
        stack.style.width = w + 'px';
        stack.style.height = h + 'px';
      }
      if (canvas2) {
        canvas2.height = h;
        canvas2.width = w;
        canvas2.style.visibility = 'visible';
        currentSumData.canvas.draw(canvas2.getContext('2d'));
      } else {
        canvas.height = h;
        canvas.width = w;
        currentSumData.canvas.draw(canvas.getContext('2d'));
      }
    }

    if (showHow && currentSumData.showHow) {
      showHow.style.visibility = 'visible';
    }
  } else {
    aDiv.innerHTML = '';
    aDiv.style.visibility = 'hidden';
    if (canvas2) {
      canvas2.height = 0.5;
      canvas2.width = 0.5;
      canvas2.style.visibility = 'hidden';
    }
    if (showHow) showHow.style.visibility = 'hidden';
  }
}

function updateViewCount() {
  const el = document.getElementById('viewCount');
  if (el) el.textContent = views;
  const btn = document.getElementById('btnSoln');
  if (btn) {
    btn.innerHTML =
      "<span class='font-weight-bold'>Show/Hide Solution</span><br>Views: <span id='viewCount'>" +
      views +
      '</span>';
  }
}

function initSecretCode() {
  const pressed = [];
  const secretCode = 'chpz';
  window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
      SolnWin = window.open('SolnWin.html', 'SolnWin', 'resizable=yes,scrollbars=yes');
    }
  });
}

function runTestMode() {
  document.querySelectorAll('.topic-btn').forEach((btn) => (btn.style.display = 'none'));
  ['testdesign', 'userhelp', 'topicInstruction'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const colourSelect = document.getElementById('colourSelect');
  if (colourSelect) {
    colourSelect.style.display = 'none';
    const label = colourSelect.previousElementSibling;
    if (label) label.style.display = 'none';
  }
  const solnBtn = document.getElementById('btnSoln');
  if (solnBtn) solnBtn.style.visibility = 'hidden';
  const notes = document.getElementById('noteslink');
  if (notes) notes.style.visibility = 'hidden';
  const formulas = document.getElementById('formulas');
  if (formulas) formulas.style.visibility = 'hidden';
  const showHow = document.getElementById('btnShowhow');
  if (showHow) showHow.style.visibility = 'hidden';

  ['myCanvas', 'myCanvas2'].forEach((id) => {
    const c = document.getElementById(id);
    if (c) {
      c.height = 0.5;
      c.width = 0.5;
      c.style.visibility = 'hidden';
    }
  });
  const stack = document.getElementById('canvasStack');
  if (stack) {
    stack.style.display = 'none';
    stack.style.height = '0';
    stack.style.width = '0';
  }

  const raw = sessionStorage.getItem('testArr');
  if (!raw) {
    document.getElementById('q').innerHTML =
      '<p class="text-danger">No test design found. Please use the Test Designer first.</p>';
    return;
  }

  let testOrder;
  try {
    testOrder = JSON.parse(raw);
  } catch (e) {
    document.getElementById('q').innerHTML = '<p class="text-danger">Invalid test data.</p>';
    return;
  }

  const qContainer = document.getElementById('q');
  const aContainer = document.getElementById('a');
  qContainer.innerHTML = '';
  aContainer.innerHTML = '';
  aContainer.style.visibility = 'visible';

  const qHeading = document.createElement('h2');
  qHeading.textContent = 'Questions';
  qHeading.className = 'mb-4';
  qContainer.appendChild(qHeading);

  const solutionsData = [];

  testOrder.forEach((displayName, index) => {
    const key = topicMap[displayName];
    if (!key || !registry[key]) {
      console.warn('Unknown topic:', displayName);
      return;
    }

    const data = registry.get(key).generate();
    const qnum = index + 1;

    const qBlock = document.createElement('div');
    qBlock.className = 'test-question mb-4';
    qBlock.dataset.topicKey = key;
    qBlock.dataset.qnum = qnum;
    qBlock.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <h5 class="mb-2">Question ${qnum}</h5>
        <button class="btn btn-sm btn-outline-warning change-q no-print">Change question</button>
      </div>
      <div class="question-body">${data.question}</div>
    `;

    if (data.canvas && !data.canvas.withSolution) {
      const c = document.createElement('canvas');
      c.width = data.canvas.width || 400;
      c.height = data.canvas.height || 400;
      c.className = 'mb-2 d-block question-canvas';
      qBlock.appendChild(c);
      try {
        data.canvas.draw(c.getContext('2d'));
      } catch (err) {
        console.error(err);
      }
    } else if (data.canvas && data.canvas.questionDraw) {
      const c = document.createElement('canvas');
      c.width = data.canvas.width || 400;
      c.height = data.canvas.height || 400;
      c.className = 'mb-2 d-block question-canvas';
      qBlock.appendChild(c);
      try {
        data.canvas.questionDraw(c.getContext('2d'));
      } catch (err) {
        console.error(err);
      }
    }

    qContainer.appendChild(qBlock);
    solutionsData.push({ qnum, data, qBlock });
  });

  const solSection = document.createElement('div');
  solSection.className = 'solutions-section mt-5';
  solSection.innerHTML = '<h2 class="mb-4">Solutions</h2>';

  solutionsData.forEach(({ qnum, data }) => {
    const sBlock = document.createElement('div');
    sBlock.className = 'test-solution-block mb-4';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn btn-sm btn-outline-secondary mb-2 toggle-soln no-print';
    toggleBtn.textContent = `Show/Hide Solution ${qnum}`;
    sBlock.appendChild(toggleBtn);

    const body = document.createElement('div');
    body.className = 'solution-body';
    body.style.display = 'none';

    const heading = document.createElement('h5');
    heading.className = 'solution-heading mb-2';
    heading.textContent = `Solution ${qnum}`;
    body.appendChild(heading);

    if (data.canvas && data.canvas.withSolution) {
      const c = document.createElement('canvas');
      c.width = data.canvas.width || 400;
      c.height = data.canvas.height || 400;
      c.className = 'mb-3 d-block';
      body.appendChild(c);
      try {
        data.canvas.draw(c.getContext('2d'));
      } catch (err) {
        console.error(err);
      }
    }

    const solnDiv = document.createElement('div');
    solnDiv.innerHTML = data.solution;
    body.appendChild(solnDiv);

    sBlock.appendChild(body);
    solSection.appendChild(sBlock);

    toggleBtn.addEventListener('click', () => {
      body.style.display = body.style.display === 'none' ? 'block' : 'none';
    });
  });

  aContainer.appendChild(solSection);

  solutionsData.forEach((item, idx) => {
    const changeBtn = item.qBlock.querySelector('.change-q');
    if (!changeBtn) return;
    changeBtn.addEventListener('click', () => {
      const key = item.qBlock.dataset.topicKey;
      const newData = registry.get(key).generate();
      item.qBlock.querySelector('.question-body').innerHTML = newData.question;

      const oldC = item.qBlock.querySelector('.question-canvas');
      if (oldC) oldC.remove();
      if (newData.canvas && !newData.canvas.withSolution) {
        const c = document.createElement('canvas');
        c.width = newData.canvas.width || 400;
        c.height = newData.canvas.height || 400;
        c.className = 'mb-2 d-block question-canvas';
        item.qBlock.appendChild(c);
        newData.canvas.draw(c.getContext('2d'));
      } else if (newData.canvas && newData.canvas.questionDraw) {
        const c = document.createElement('canvas');
        c.width = newData.canvas.width || 400;
        c.height = newData.canvas.height || 400;
        c.className = 'mb-2 d-block question-canvas';
        item.qBlock.appendChild(c);
        newData.canvas.questionDraw(c.getContext('2d'));
      }

      const solBlock = document.querySelectorAll('.test-solution-block')[idx];
      if (solBlock) {
        const solBody = solBlock.querySelector('.solution-body');
        solBody.innerHTML = '';
        const heading = document.createElement('h5');
        heading.className = 'solution-heading mb-2';
        heading.textContent = `Solution ${item.qnum}`;
        solBody.appendChild(heading);
        if (newData.canvas && newData.canvas.withSolution) {
          const c = document.createElement('canvas');
          c.width = newData.canvas.width || 400;
          c.height = newData.canvas.height || 400;
          c.className = 'mb-3 d-block';
          solBody.appendChild(c);
          newData.canvas.draw(c.getContext('2d'));
        }
        const solnDiv = document.createElement('div');
        solnDiv.innerHTML = newData.solution;
        solBody.appendChild(solnDiv);
      }

      utils.eqnformat('q');
      utils.eqnformat('a');
      item.data = newData;
    });
  });

  utils.eqnformat('q');
  utils.eqnformat('a');
}
