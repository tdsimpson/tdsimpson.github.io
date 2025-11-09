// Get project ID from URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Load and populate project data
function loadProject() {
    var projectId = getUrlParameter('id');
    
    if (!projectId) {
        console.error('No project ID provided');
        return;
    }

    // Load project data from JSON file
    fetch('../js/projects-data.json')
        .then(response => response.json())
        .then(data => {
            var project = data[projectId];
            
            if (!project) {
                console.error('Project not found: ' + projectId);
                return;
            }

            // Populate page title
            document.getElementById('page-title').textContent = 'Taylor Simpson — ' + project.title;
            
            // Populate project header
            document.getElementById('project-title').textContent = project.title;
            document.getElementById('project-type').textContent = project.projectType;
            document.getElementById('project-blurb').textContent = project.blurb;
            
            // Populate link if it exists
            if (project.link) {
                var linkElement = document.getElementById('project-link');
                linkElement.href = project.link.url;
                document.getElementById('link-text').textContent = project.link.text;
                linkElement.style.display = 'block';
            }
            
            // Populate media
            var mediaContainer = document.getElementById('media-container');
            if (project.media.type === 'image') {
                var img = document.createElement('img');
                img.src = project.media.src;
                if (project.media.style) {
                    img.style.cssText = project.media.style;
                }
                mediaContainer.appendChild(img);
            } else if (project.media.type === 'iframe') {
                var iframe = document.createElement('iframe');
                iframe.className = 'video';
                iframe.src = project.media.src;
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                mediaContainer.appendChild(iframe);
            }
            
            // Populate client
            document.getElementById('project-client').textContent = project.client;
            
            // Populate type list
            var typeList = document.getElementById('project-type-list');
            project.type.forEach(function(type) {
                var p = document.createElement('p');
                p.textContent = type;
                typeList.appendChild(p);
            });
            
            // Populate tools list
            var toolsList = document.getElementById('project-tools-list');
            project.tools.forEach(function(tool) {
                var p = document.createElement('p');
                p.textContent = tool;
                toolsList.appendChild(p);
            });
            
            // Populate content sections
            var contentContainer = document.getElementById('content-container');
            
            // Problem Definition
            var problemSec = document.createElement('div');
            problemSec.className = 'sec';
            problemSec.innerHTML = '<p class="sec-title">Problem Definition</p><p class="sec-text">' + project.problemDefinition + '</p>';
            contentContainer.appendChild(problemSec);
            
            // Optional sections (like "Current Process")
            if (project.optionalSections && project.optionalSections.length > 0) {
                project.optionalSections.forEach(function(section) {
                    var sec = document.createElement('div');
                    sec.className = 'sec';
                    sec.innerHTML = '<p class="sec-title">' + section.title + '</p><p class="sec-text">' + section.content + '</p>';
                    contentContainer.appendChild(sec);
                });
            }
            
            // Product Goal
            var goalSec = document.createElement('div');
            goalSec.className = 'sec';
            goalSec.innerHTML = '<p class="sec-title">Product Goal</p><p class="sec-text">' + project.productGoal + '</p>';
            contentContainer.appendChild(goalSec);
            
            // Constraints & Assumptions
            var conAssDiv = document.createElement('div');
            conAssDiv.className = 'con-ass';
            
            var constraintsSec = document.createElement('div');
            constraintsSec.className = 'sec side-by-side';
            var constraintsList = '<p class="sec-title">Constraints</p><ul>';
            project.constraints.forEach(function(constraint) {
                constraintsList += '<li class="sec-text">' + constraint + '</li>';
            });
            constraintsList += '</ul>';
            constraintsSec.innerHTML = constraintsList;
            conAssDiv.appendChild(constraintsSec);
            
            var assumptionsSec = document.createElement('div');
            assumptionsSec.className = 'sec side-by-side';
            var assumptionsList = '<p class="sec-title">Assumptions</p><ul>';
            project.assumptions.forEach(function(assumption) {
                assumptionsList += '<li class="sec-text">' + assumption + '</li>';
            });
            assumptionsList += '</ul>';
            assumptionsSec.innerHTML = assumptionsList;
            conAssDiv.appendChild(assumptionsSec);
            
            contentContainer.appendChild(conAssDiv);
            
            // Conclusion
            var conclusionSec = document.createElement('div');
            conclusionSec.className = 'sec';
            conclusionSec.innerHTML = '<p class="sec-title">Conclusion</p><p class="sec-text">' + project.conclusion + '</p>';
            contentContainer.appendChild(conclusionSec);
            
            // Next Project footer
            if (project.nextProject) {
                document.getElementById('next-project-name').textContent = project.nextProject.name;
                var nextButton = document.getElementById('next-project-button');
                nextButton.addEventListener('click', function() {
                    window.location.href = project.nextProject.url;
                });
                document.getElementById('product-footer').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error loading project data:', error);
        });
}

// Load project when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProject);
} else {
    loadProject();
}

