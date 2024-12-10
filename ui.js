import {diakokContainer, termekContainer, tantargyakContainer, male, female } from './variable.js'

// ui.js
export function updateButtonText(button, text) {
  button.innerText = text;
}

export function renderDataToHTML(diakok, termek, tantargyak) {
  generateStudentsHTML(diakok)
  



   console.log(diakok);
/*  console.log(termek);
  console.log(tantargyak); */

  

}


function generateStudentsHTML(students) {
  let student = "";

  students.forEach(e => {
    student = `
      <div class="card m-2" style="width: 18rem;">
        <img src=${e.sex === "female" ? female : male} alt="Student Image" class="card-img-top img-fluid mt-1">
        <div class="card-body">
          <h2 class="card-title">${e.vezeteknev} ${e.keresztnev}</h2>
          <p class="card-text">Ez egy egyszerű HTML kártya példája, amely tartalmaz egy képet, egy címet, szöveget és egy gombot.</p>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Órarend
          </button>

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${e.vezeteknev} ${e.keresztnev} órarendje</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    `
    diakokContainer.innerHTML += student
  });


}