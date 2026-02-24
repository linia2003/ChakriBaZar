let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const tabJobCount = document.getElementById('tab-job-count');

function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === 'all-filter-btn') {
        tabJobCount.innerText = allCardSection.children.length;
    } else if (currentStatus === 'interview-filter-btn') {
        tabJobCount.innerText = interviewList.length;
    } else {
        tabJobCount.innerText = rejectedList.length;
    }
}

calculateCount();

function toggleStyle(id) {
    allFilterBtn.classList.add('bg-gray-300', 'text-black');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black');

    allFilterBtn.classList.remove('bg-black', 'text-white');
    interviewFilterBtn.classList.remove('bg-black', 'text-white');
    rejectedFilterBtn.classList.remove('bg-black', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-black', 'text-white');

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    calculateCount();
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.closest('.card');

        const companyName = parenNode.querySelector('.companyName').innerText;
        const position = parenNode.querySelector('.position').innerText;
        const location = parenNode.querySelector('.location').innerText;
        const type = parenNode.querySelector('.type').innerText;
        const salary = parenNode.querySelector('.salary').innerText;
        const description = parenNode.querySelector('.description').innerText;

        parenNode.querySelector('.status').innerText = 'Status: Interview';

        const jobInfo = { companyName, position, location, type, salary, description, status: 'Interview' };

        const jobExist = interviewList.find(item => item.companyName == jobInfo.companyName && item.position == jobInfo.position);

        if (!jobExist) {
            interviewList.push(jobInfo);
        }

        rejectedList = rejectedList.filter(item => !(item.companyName == jobInfo.companyName && item.position == jobInfo.position));

        if (currentStatus == 'rejected-filter-btn') {
            renderRejected();
        }
        calculateCount();

    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.closest('.card');

        const companyName = parenNode.querySelector('.companyName').innerText;
        const position = parenNode.querySelector('.position').innerText;
        const location = parenNode.querySelector('.location').innerText;
        const type = parenNode.querySelector('.type').innerText;
        const salary = parenNode.querySelector('.salary').innerText;
        const description = parenNode.querySelector('.description').innerText;

        parenNode.querySelector('.status').innerText = 'Status: Rejected';

        const jobInfo = { companyName, position, location, type, salary, description, status: 'Rejected' };

        const jobExist = rejectedList.find(item => item.companyName == jobInfo.companyName && item.position == jobInfo.position);

        if (!jobExist) {
            rejectedList.push(jobInfo);
        }

        interviewList = interviewList.filter(item => !(item.companyName == jobInfo.companyName && item.position == jobInfo.position));

        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        calculateCount();

    } else if (event.target.classList.contains('btn-delete')) {
        const card = event.target.closest('.card');
        const companyName = card.querySelector('.companyName').innerText;
        const position = card.querySelector('.position').innerText;

        interviewList = interviewList.filter(item => !(item.companyName == companyName && item.position == position));
        rejectedList = rejectedList.filter(item => !(item.companyName == companyName && item.position == position));
        
        card.remove();
        
        if (currentStatus == 'interview-filter-btn') renderInterview();
        if (currentStatus == 'rejected-filter-btn') renderRejected();
        
        calculateCount();
    }
});

function renderInterview() {
    filterSection.innerHTML = '';
    if (interviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 space-y-4">
                <img src="https://github.com/ProgrammingHero1/B13-A4-PH-Job-Tracker/blob/main/jobs.png?raw=true" alt="No jobs" class="w-24 h-24 object-contain">
                <div class="text-center">
                    <h3 class="text-xl font-bold">No Jobs Available</h3>
                    <p class="text-gray-500 text-sm">Your interview list is currently empty.</p>
                </div>
            </div>`;
        return;
    }

    for (let job of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex flex-col md:flex-row justify-between border bg-white p-4 md:p-6 gap-4';
        div.innerHTML = `
            <div class="space-y-3">
                <div>
                    <p class="companyName text-blue-900 font-bold">${job.companyName}</p>
                    <p class="position">${job.position}</p>
                </div>
                <div class="flex flex-wrap gap-2 text-xs md:text-sm">
                    <p class="location bg-gray-200 px-3 md:px-5">${job.location}</p>
                    <p class="type bg-gray-200 px-3 md:px-5">${job.type}</p>
                    <p class="salary bg-gray-200 px-3 md:px-5">${job.salary}</p>
                </div>
                <p class="description text-gray-600 text-sm">${job.description}</p>
                <p class="status text-gray-400 italic text-xs">Status: ${job.status}</p>
                <div class="flex gap-4">
                    <button class="interview-btn bg-green-200 px-4 py-2 text-sm">Interview</button>
                    <button class="rejected-btn bg-red-200 px-4 py-2 text-sm">Rejected</button>
                </div>
            </div>
            <div class="flex md:block justify-end">
                <button class="btn-delete bg-rose-100 text-rose-600 px-4 py-2 text-sm">Delete</button>
            </div>`;
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = '';
    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 space-y-4">
                <img src="https://github.com/ProgrammingHero1/B13-A4-PH-Job-Tracker/blob/main/jobs.png?raw=true" alt="No jobs" class="w-24 h-24 object-contain">
                <div class="text-center">
                    <h3 class="text-xl font-bold">No Jobs Available</h3>
                    <p class="text-gray-500 text-sm">No rejected applications to show.</p>
                </div>
            </div>`;
        return;
    }

    for (let job of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex flex-col md:flex-row justify-between border bg-white p-4 md:p-6 gap-4';
        div.innerHTML = `
            <div class="space-y-3">
                <div>
                    <p class="companyName text-blue-900 font-bold">${job.companyName}</p>
                    <p class="position">${job.position}</p>
                </div>
                <div class="flex flex-wrap gap-2 text-xs md:text-sm">
                    <p class="location bg-gray-200 px-3 md:px-5">${job.location}</p>
                    <p class="type bg-gray-200 px-3 md:px-5">${job.type}</p>
                    <p class="salary bg-gray-200 px-3 md:px-5">${job.salary}</p>
                </div>
                <p class="description text-gray-600 text-sm">${job.description}</p>
                <p class="status text-gray-400 italic text-xs">Status: ${job.status}</p>
                <div class="flex gap-4">
                    <button class="interview-btn bg-green-200 px-4 py-2 text-sm">Interview</button>
                    <button class="rejected-btn bg-red-200 px-4 py-2 text-sm">Rejected</button>
                </div>
            </div>
            <div class="flex md:block justify-end">
                <button class="btn-delete bg-rose-100 text-rose-600 px-4 py-2 text-sm">Delete</button>
            </div>`;
        filterSection.appendChild(div);
    }
}