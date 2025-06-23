function sendToBackend(formData) {
    window.localApi.sendNodeForm(formData);
}

const nodeName = document.querySelector('#node-name');
const nodePort = document.querySelector('#node-port');
const nodeRpc = document.querySelector('#node-rpc');
const selectDir = document.querySelector('#select-dir');
const submit = document.querySelector('#submit');

selectDir.addEventListener('click', () => {
    window.localApi.sendAction('open-directory-dialog');
});

window.localApi.onSelectedDirectory(path => {
    document.getElementById('node-name').value = path;
});

submit.addEventListener('click', (event) => {
    event.preventDefault();

    if (!nodeName.value) {
        alert('Node name is required');
        return;
    }

    const formData = {
        nodeName: nodeName.value,
        nodePort: nodePort.value || null,
        nodeRpc: nodeRpc.value || null
    };

    sendToBackend(formData);

    checkAndRedirect((nodePort.value) ? nodePort.value : '8080');
});

function checkAndRedirect(port) {
    console.log(`Redirecting to http://localhost:${port}`);
    fetch(`http://localhost:${port}`, { mode: 'no-cors' })
        .then(() => {
            window.localApi.sendGoHome(port);
        })
        .catch(() => {
            setTimeout(() => checkAndRedirect(port), 1000);
        });
}

// Handle update notifications
window.localApi.onUpdateAvailable((updateInfo) => {
    const notification = document.getElementById('update-notification');
    const message = document.getElementById('update-message');
    const downloadBtn = document.getElementById('download-update');
    const dismissBtn = document.getElementById('dismiss-update');

    message.textContent = `Version ${updateInfo.latestVersion} is available (current: ${updateInfo.currentVersion})`;
    notification.classList.add('show');

    downloadBtn.addEventListener('click', () => {
        window.localApi.openDownloadUrl(updateInfo.downloadUrl);
        notification.classList.remove('show');
    });

    dismissBtn.addEventListener('click', () => {
        notification.classList.remove('show');
    });
});

// Handle previously booted nodes
let allNodes = [];
let showingAll = false;

function displayNodes(nodes, showAll = false) {
    const nodesList = document.getElementById('node-dirs-list');
    const showMoreBtn = document.getElementById('show-more-btn');
    const nodeDirsContainer = document.getElementById('node-dirs');

    // Clear existing list
    nodesList.innerHTML = '';

    if (nodes.length === 0) {
        nodeDirsContainer.classList.add('hidden');
        return;
    }

    nodeDirsContainer.classList.remove('hidden');

    // Determine how many nodes to show
    const nodesToShow = showAll ? nodes : nodes.slice(0, 3);

    nodesToShow.forEach(node => {
        const li = document.createElement('li');
        li.className = 'node-item';
        li.innerHTML = `
            <div class="node-path">${node.path}</div>
            <div class="node-details">Port: ${node.port}${node.rpc ? ', RPC: ' + node.rpc : ''}</div>
        `;

        li.addEventListener('click', () => {
            document.getElementById('node-name').value = node.path;
            document.getElementById('node-port').value = node.port !== '8080' ? node.port : '';
            document.getElementById('node-rpc').value = node.rpc || '';
        });

        nodesList.appendChild(li);
    });

    // Show/hide "Show more" button
    if (nodes.length > 3 && !showAll) {
        showMoreBtn.style.display = 'block';
        showMoreBtn.textContent = `Show ${nodes.length - 3} more`;
    } else if (showAll) {
        showMoreBtn.style.display = 'block';
        showMoreBtn.textContent = 'Show less';
    } else {
        showMoreBtn.style.display = 'none';
    }
}

window.localApi.onBootedNodes((nodes) => {
    allNodes = nodes;
    displayNodes(nodes, false);
});

const showMoreBtn = document.getElementById('show-more-btn');
showMoreBtn.addEventListener('click', () => {
    showingAll = !showingAll;
    displayNodes(allNodes, showingAll);
});
