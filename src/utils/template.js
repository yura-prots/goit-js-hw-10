export function templateCreator(imageUrl, imageAlt, breedDes, breedTemp) {
  const template = `<div class="img-box">
                        <img src="${imageUrl}" alt="${imageAlt}" width="400"/>
                      </div>
                      <div class="description">
                        <h1>${imageAlt}</h1>
                        <p>${breedDes}</p>
                        <p><b>Temperament:</b> ${breedTemp}</p>
                      </div>
                    `;

  return template;
}
