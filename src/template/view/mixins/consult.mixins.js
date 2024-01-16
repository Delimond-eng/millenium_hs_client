export default {
  data() {
    return {
      patientSelect2: null,
      editor: "",
      formLoading: false,

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
      symptomes: [
        {
          libelle: "",
        },
      ],

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
    },

    /**
     * SOUMET UNE CONSULTATION AU SERVEUR
     */
    submitFormConsult(e) {
      this.form_consult.agent_id = this.$user().agent_id;
      this.form_consult.created_by = this.$user().id;
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
          s.created_by = this.$user().id;
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
            $("#prescriptions-tab").click();
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
  },
  computed: {
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },
};
