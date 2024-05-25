<template>
    <div id="patient-edit-modal" class="modal fade fadeInRight" tabindex="-1" aria-labelledby="myModalLabel"
        aria-hidden="true" style="display: none;">
        <form class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myModalLabel">Patient édition</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mt-3">
                                <label class="form-label">Assurance <sup class="text-danger">(Optionnel)</sup></label>
                                <select class="form-select" v-model="form.assure">
                                    <option value="Non" selected>Non</option>
                                    <option value="Oui">Oui</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6" v-if="form.assure === 'Oui'">
                            <div class="mt-3">
                                <label class="form-label">Numéro assurance<sup class="text-danger">*</sup></label>
                                <div class="input-group">
                                    <input type="text" @input="findAssureInfos" v-model="form.num_assurance"
                                        class="form-control form-control-icon" required
                                        placeholder="saisir le n° assurance du patient..." />
                                    <button type="button" @click="$showBsModal('assuranceInfoModal')"
                                        v-if="assuranceInfos" class="btn btn-info">
                                        <i class="ri-eye-2-line"></i> Voir détails
                                    </button>
                                    <button v-else-if="searchLoading" disabled class="btn btn-icon btn-dark">
                                        <svg-loading size="20"></svg-loading>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- patient code input -->
                        <div class="col-md-2">
                            <div class="mt-3">
                                <label for="patientCode" class="form-label">Patient code</label>
                                <div class="form-icon">
                                    <input type="text" class="form-control form-control-icon" id="patientCode"
                                        v-model="form.code" disabled />
                                    <i class="bx bx-hash"></i>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="mt-3">
                                <label for="appelCode" class="form-label">Code appel <sup
                                        class="text-danger">*</sup></label>
                                <div class="form-icon">
                                    <input type="text" class="form-control form-control-icon" id="appelCode"
                                        placeholder="code d'appel" v-model="form.code_appel" required />
                                    <i class="bx bx-hash"></i>
                                </div>
                            </div>
                        </div>

                        <!-- nom input -->
                        <div class="col-md-6">
                            <div class="mt-3">
                                <label class="form-label">Nom <sup class="text-danger">*</sup></label>
                                <div class="form-icon">
                                    <input type="text" v-model="form.nom" class="form-control form-control-icon"
                                        placeholder="Saisir le nom du patient...ex:KAYEMBE" required />
                                    <i class="ri-user-2-line"></i>
                                </div>
                            </div>
                        </div>

                        <!-- prenom input -->
                        <div class="col-md-6">
                            <div class="mt-3">
                                <label class="form-label">Prénom <sup class="text-danger">*</sup></label>
                                <div class="form-icon">
                                    <input type="text" v-model="form.prenom" class="form-control form-control-icon"
                                        placeholder="Saisir le prénom du patient...ex:Lionnel" required />
                                    <i class="ri-user-2-line"></i>
                                </div>
                            </div>
                        </div>

                        <!-- patient sexe select -->
                        <div class="col-md-3">
                            <div class="mt-3">
                                <label class="form-label">Sexe <sup class="text-danger">*</sup></label>
                                <div class="form-icon">
                                    <select class="form-select" id="inputGroupSelect01" v-model="form.sexe">
                                        <option selected label="Sélectionner un sexe" hidden></option>
                                        <option value="M">Masculin</option>
                                        <option value="F">Féminin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- telephone input -->
                        <div class="col-md-3">
                            <div class="mt-3">
                                <label class="form-label">Téléphone<sup class="text-danger">*</sup></label>
                                <div class="form-icon">
                                    <input type="text" v-model="form.telephone" class="form-control form-control-icon"
                                        placeholder="Saisir le tél... ex: +(243) 810000000" />
                                    <i class="ri-phone-line"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mt-3">
                                <label class="form-label">Téléphone d'urgence<sup
                                        class="text-danger">(optionnel)</sup></label>
                                <div class="form-icon">
                                    <input type="text" v-model="form.telephone_urgence"
                                        class="form-control form-control-icon"
                                        placeholder="Saisir le tél... ex: +(243) 810000000" />
                                    <i class="ri-phone-line"></i>
                                </div>
                            </div>
                        </div>

                        <!-- sate naissance input -->
                        <div class="col-md-3">
                            <div class="mt-3">
                                <label class="form-label">Date de naissance<sup class="text-danger">*</sup></label>
                                <div class="form-icon">
                                    <input type="text" v-model="form.datenais" class="form-control form-control-icon"
                                        required />
                                    <i class="ri-calendar-2-line"></i>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="mt-3">
                                <label class="form-label">Etat civil<sup class="text-danger">*</sup></label>
                                <select class="form-select" v-model="form.etat_civil" required>
                                    <option selected hidden label="Sélectionner Etat civil"></option>
                                    <option value="Célibataire">Célibataire</option>
                                    <option value="Marié">Marié(e)</option>
                                    <option value="Divorcé">Divorcé(e)</option>
                                    <option value="Veuf">Veuf(ve)</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mt-3">
                                <label class="form-label">Groupe sanguin<sup
                                        class="text-danger">(Optionnel)</sup></label>
                                <select class="form-select" v-model="form.groupe_sang">
                                    <option selected hidden label="Sélectionner le groupe sanguin"></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                    <option value="Rh positif (+)">Rh positif (+)</option>
                                    <option value="Rh négatif (-)">Rh négatif (-)</option>
                                </select>
                            </div>
                        </div>

                        <!-- adresse input -->
                        <div class="col-md-12">
                            <div class="mt-3">
                                <label class="form-label">Adresse<sup class="text-danger">*</sup></label>
                                <textarea class="form-control" v-model="form.adresse"
                                    placeholder="Saisir l'adresse du patient... ex: n°.. av.. Q.. C.."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-primary ">Sauvegarder les modifications</button>
                </div>
            </div><!-- /.modal-content -->
        </form><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
export default {
    name: 'PatientEditModal',
    data() {
        return {
            form: {
                code: "",
                code_appel: "",
                nom: "",
                prenom: "",
                sexe: "",
                telephone: "",
                telephone_urgence: "",
                adresse: "",
                datenais: "",
                patient_id: "",
                groupe_sang: "",
                etat_civil: "",
                num_assurance: "",
                assure: "Non",
                created_by: "",
            },
        }
    },

    mounted() {
        let self = this;
        $("#patient-edit-modal").on("hidden.bs.modal", function (e) {
            localStorage.removeItem('cached-patient')
        });

        $("#patient-edit-modal").on("show.bs.modal", function (e) {
            const cachedPatient = localStorage.getItem("cached-patient");
            if (cachedPatient !== null) {
                const patient = JSON.parse(cachedPatient);
                self.form.patient_id = patient.id;
                self.form.code = patient.patient_code;
                self.form.nom = patient.patient_nom;
                self.form.prenom = patient.patient_prenom;
                self.form.sexe = patient.patient_sexe;
                self.form.adresse = patient.patient_adresse;
                self.form.telephone_urgence = patient.patient_contact_urgence;
                if (patient.patient_num_assurance !== null) {
                    self.form.assure = "Oui";
                    self.form.num_assurance = patient.patient_num_assurance;
                }
                self.form.datenais = patient.patient_datenais;
                self.form.groupe_sang = patient.patient_gs;
                self.form.etat_civil = patient.patient_etat_civil;
                self.form.patient_id = patient.id;
                self.form.telephone = patient.patient_telephone;
            }
        });
    }
}
</script>