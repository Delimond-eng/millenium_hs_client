export default {
  data() {
    return {
      patientSelect2: null,
      editor: "",
      formLoading: false,
      formLoadingExamens: false,
      formLoadingPrescriptions: false,
      currentConsult: null,
      errors_msg: "",
      form_consult: {
        libelle: "",
        diagnostic: "",
        patient_id: "",
        patient_fiche_id: "",
        agent_id: "",
        consult_details: [],
        consult_symptomes: [],
      },
      consult_details: [
        {
          detail_libelle: "Antécedents familiaux",
          detail_valeur: "",
        },
        {
          detail_libelle: "Antécedents médicaux",
          detail_valeur: "",
        },
        {
          detail_libelle: "Antécedents chirurgicaux",
          detail_valeur: "",
        },
      ],
      prescriptions: [
        {
          traitement: "",
          traitement_type: "",
          posologie: "",
          consult_id: "",
        },
      ],
      symptomes: [
        {
          libelle: "",
        },
      ],
      form_examens: [],
      selectedPatient: null,
    };
  },

  async mounted() {
    this.$nextTick(() => {
      this.$showBsModal("patientsPendingModal");
    });
    this.$store.dispatch("services/viewAllExamens");
    this.init();
  },

  methods: {
    async init() {
      let self = this;
      let agentId = this.$user().agent_id;
      console.log("agent id", agentId);
      /* let patients = await this.$store.dispatch(
                                                                                                                                                                                                                                                                                                                                            "services/viewMedecinsAssignments",
                                                                                                                                                                                                                                                                                                                                            agentId
                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                          if (this.patientSelect2 !== null) this.patientSelect2.select2("destroy");
                                                                                                                                                                                                                                                                                                                                          this.patientSelect2 = $(".patient-select2")
                                                                                                                                                                                                                                                                                                                                            .select2({
                                                                                                                                                                                                                                                                                                                                              placeholder: "Veuillez sélectionner un patient...",
                                                                                                                                                                                                                                                                                                                                              searchInputPlaceholder: "Recherche patient...",
                                                                                                                                                                                                                                                                                                                                              data: $.map(patients, function (item) {
                                                                                                                                                                                                                                                                                                                                                return {
                                                                                                                                                                                                                                                                                                                                                  text: `${item.patient_code} : ${item.patient_nom} ${item.patient_prenom}`,
                                                                                                                                                                                                                                                                                                                                                  id: item.id,
                                                                                                                                                                                                                                                                                                                                                  info: item,
                                                                                                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                                                                                              }),
                                                                                                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                                                                                                            .on("change", function () {
                                                                                                                                                                                                                                                                                                                                              //$(this).select2('data')[0].info
                                                                                                                                                                                                                                                                                                                                              let id = $(this).val();
                                                                                                                                                                                                                                                                                                                                              if (id !== "") {
                                                                                                                                                                                                                                                                                                                                                self.$store.dispatch("services/showPatient", id).then((result) => {
                                                                                                                                                                                                                                                                                                                                                  self.selectedPatient = result;
                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                            }); */
      /* ClassicEditor.create(document.querySelector(".editor"), {
                                                                                                                                                                                                                                                                                                                                placeholder:
                                                                                                                                                                                                                                                                                                                                  "Veuillez saisir diagnostic pour la consultation en cours...",
                                                                                                                                                                                                                                                                                                                              })
                                                                                                                                                                                                                                                                                                                                .then(function (e) {
                                                                                                                                                                                                                                                                                                                                  e.ui.view.editable.element.style.height = "150px";
                                                                                                                                                                                                                                                                                                                                  e.ui.view.editable.element.style.fontColor = "#000000";
                                                                                                                                                                                                                                                                                                                                  e.model.document.on("change", () => {
                                                                                                                                                                                                                                                                                                                                    self.editor = jQuery(e.getData()).text().replaceAll("\n\n", "\n");
                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                                                                                .catch(function (e) {
                                                                                                                                                                                                                                                                                                                                  console.error("Error from editor => ", e);
                                                                                                                                                                                                                                                                                                                                }); */
    },

    /**
     * SOUMET UNE CONSULTATION AU SERVEUR
     */
    submitFormConsult(e) {
      this.form_consult.agent_id = this.$user().agent_id;
      this.form_consult.patient_id = this.selectedPatient.id;

      let details = [];
      let symptomes = [];
      for (let detail of this.consult_details) {
        if (detail.detail_valeur !== "") {
          details.push(detail);
        }
      }
      for (let s of this.symptomes) {
        if (s.libelle !== "") {
          symptomes.push(s);
        }
      }
      this.form_consult.consult_symptomes = symptomes;
      this.form_consult.consult_details = details;
      this.form_consult.patient_fiche_id =
        this.selectedPatient.details[
          this.selectedPatient.details.length - 1
        ].id;

      this.formLoading = true;
      this.$store
        .dispatch("services/saveConsult", this.form_consult)
        .then((res) => {
          console.log(res);
          console.log(JSON.stringify(res));
          this.formLoading = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Consultation créée avec succès !",
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            this.currentConsult = res.consultation;
          }
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToast4");
            new bootstrap.Toast(toast, { delay: 2000 }).show();
          }
        })
        .catch((err) => {
          this.formLoading = false;
          console.log(JSON.stringify(err));
        });
    },

    /**
     * AJOUTE DES PRESCRIPTIONS A UNE CONSULTATION EN COURS
     */
    submitFormPrescriptions(e) {
      if (this.currentConsult === null) {
        console.log("Null value");
        this.errors_msg =
          "Veuillez consulter le patient avant de le prescrire !";
        let toast = document.getElementById("errorsToast5");
        new bootstrap.Toast(toast, { delay: 2000 }).show();
        return;
      }
      for (let p of this.prescriptions) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        p.consult_id = this.currentConsult.id;
        p.hopital_id = user.hopital.id;
        p.emplacement_id = user.hopital.emplacement.id;
        p.created_by = user.id;
      }
      let form = {
        prescriptions: this.prescriptions,
      };

      this.formLoadingPrescriptions = true;
      this.$store
        .dispatch("services/addPrescriptions", form)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoadingPrescriptions = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Prescriptions ajoutées avec succès !",
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
          }
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToast5");
            new bootstrap.Toast(toast, { delay: 2000 }).show();
          }
        })
        .catch((err) => {
          this.formLoadingPrescriptions = false;
          console.log(JSON.stringify(err));
        });
    },
    /**
     * REFRESH ALL FIELDS
     */
    refreshAll() {
      this.currentConsult = null;
      (this.form_consult = {
        libelle: "",
        diagnostic: "",
        patient_id: "",
        agent_id: "",
        consult_details: [],
      }),
        (this.consult_details = [
          {
            detail_libelle: "Antécedents familiaux",
            detail_valeur: "",
          },
          {
            detail_libelle: "Antécedents médicaux",
            detail_valeur: "",
          },
          {
            detail_libelle: "Antécedents chirurgicaux",
            detail_valeur: "",
          },
        ]);
      this.prescriptions = [
        {
          traitement: "",
          traitement_type: "",
          posologie: "",
          consult_id: "",
        },
      ];
      this.selectedPatient = null;
      $(".patient-select2").val("").trigger("change");
      this.$showBsModal("patientsPendingModal");
    },

    /**
     * Crée la prescription des examens pour un patient
     */
    submitFormExamens(e) {
      if (this.currentConsult === null) {
        this.errors_msg =
          "Veuillez consulter le patient avant de le prescrire !";
        let toast = document.getElementById("errorsToastExamen");
        new bootstrap.Toast(toast, { delay: 2000 }).show();
        return;
      }
      this.formLoadingExamens = true;
      let user = JSON.parse(localStorage.getItem("user-data"));
      for (let exam of this.form_examens) {
        exam.consult_id = this.currentConsult.id;
        exam.patient_id = this.selectedPatient.id;
        exam.created_by = user.id;
        exam.hopital_id = user.hopital.id;
        exam.emplacement_id = user.hopital.emplacement.id;
      }
      this.$store
        .dispatch("services/addExamens", this.form_examens)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoadingExamens = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Demandes d'examens effectuées avec succès !",
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            this.$store.dispatch("services/viewAllConsultsExamens");
          }
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastExamen");
            new bootstrap.Toast(toast, { delay: 2000 }).show();
          }
        })
        .catch((err) => {
          this.formLoadingExamens = false;
          console.log(JSON.stringify(err));
        });
    },

    readCommand() {
      if ("speechSynthesis" in window) {
        let medecin = this.$user().name;
        let patientCode = `${this.selectedPatient.patient_nom} ${this.selectedPatient.patient_prenom}`;
        let texteAvecVoix = `Le patient ${patientCode} est prié d'aller voir le médecin ${medecin}`;
        const utterance = new SpeechSynthesisUtterance(texteAvecVoix);
        utterance.lang = "fr-FR";
        let voixFeminineFrancaise = speechSynthesis
          .getVoices()
          .find((voice) => {
            return voice.lang === "fr-FR" && voice.gender === "female";
          });

        if (!voixFeminineFrancaise) {
          voixFeminineFrancaise = speechSynthesis.getVoices().find((voice) => {
            return voice.lang === "fr-FR";
          });
        }

        utterance.voice = voixFeminineFrancaise;
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      } else {
        alert(
          "Désolé, l'API Web Speech n'est pas prise en charge dans votre navigateur."
        );
      }
    },

    triggerSelectExamen(e, data) {
      let checked = e.target.checked;
      if (checked) {
        this.form_examens.push({
          examen_id: data.id,
          consult_id: 0,
          agent_id: this.user.agent_id,
          emplacement_id: this.user.hopital.emplacement.id,
          hopital_id: this.user.hopital.id,
        });
      } else {
        for (let i = 0; i < this.form_examens.length; i++) {
          if (this.form_examens[i].examen_id === data.id) {
            this.form_examens.splice(i, 1);
            break;
          }
        }
      }
      console.log(JSON.stringify(this.form_examens));
    },
  },
  computed: {
    examens() {
      return this.$store.getters["services/GET_EXAMENS"];
    },
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },
};
