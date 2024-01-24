<template>
    <div class="tab-pane fade" id="schedules" role="tabpanel" aria-labelledby="schedules-tab">
        <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Veuillez configurer
            votre prochain rendez-vous avec ce patient !</h6>
        <div class="border border-dashed mb-2"></div>
        <form @submit.prevent="submitFormSchedule" class="row text-dark">
            <div class="mb-2 col-md-6">
                <label for="hsnom">Date & heure du rendez-vous <sup class="text-danger">*</sup> </label>
                <div class="d-flex">
                    <input type="date" v-model="schedule.date" class="form-control me-1 flex-fill" id="exampleInputEmail1"
                        required>
                    <input type="time" class="form-control flex-grow-0 me-2" v-model="schedule.hour" style="width: 100px;"
                        required>
                </div>
            </div>

            <div class="col-md-6 mb-2">
                <label for="duree">Durée <sup class="text-danger">(Optionnel)</sup></label>
                <input type="number" class="form-control" placeholder="la durée du rendez-vous !"
                    v-model="form_schedule.schedule_duree">
            </div>

            <div class="col-md-12 mb-2">
                <label for="hsnom">Notes & commentaires <sup class="text-danger">(Optionnel)</sup> </label>
                <textarea class="form-control" v-model="form_schedule.schedule_note" placeholder="Note & commentaire..."
                    required></textarea>
            </div>
            <bs-toast id="errorsToastSchedule" :msg="errors_msg2" />
            <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                <button type="button" class="btn btn-light btn-border btn-label right me-2"><i
                        class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                    Annuler</button>

                <load-button btn-type="submit" :loading="formLoadingSchedule"
                    class-name="btn-success btn-border btn-label right nexttab nexttab "><i
                        class="ri-check-double-line label-icon align-middle fs-16 ms-2 "></i>Configurer
                    le rendez-vous
                </load-button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: 'SchedulesTab',

    data() {
        return {
            form_schedule: {
                schedule_duree: '',
                schedule_note: '',
                schedule_date_heure: ''
            },
            schedule: {
                date: '',
                hour: ''
            },
            formLoadingSchedule: false,
            errors_msg2: ''
        }
    },
    methods: {
        submitFormSchedule(e) {
            this.formLoadingSchedule = true;
            this.form_schedule.patient_id = this.selectedPatient.id;
            this.form_schedule.agent_id = this.$user().agent_id;
            this.form_schedule.schedule_date_heure = `${this.schedule.date} ${this.schedule.hour}`;
            this.$store
                .dispatch("services/createSchedule", this.form_schedule)
                .then((res) => {
                    console.log(JSON.stringify(res));
                    this.formLoadingSchedule = false;
                    if (res.status !== undefined) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Rendez-vous configuré avec succès !",
                            showConfirmButton: false,
                            toast: true,
                            timer: 3000,
                            showCloseButton: false,
                        });
                    }
                    if (res.errors !== undefined) {
                        console.log(JSON.stringify(res));
                        this.errors_msg2 = res.errors.toString();
                        let toast = document.getElementById("errorsToastSchedule");
                        new bootstrap.Toast(toast, { delay: 2000 }).show();
                    }
                })
                .catch((err) => {
                    this.formLoadingSchedule = false;
                    console.log(JSON.stringify(err));
                });
        },
    },

    props: {
        currentConsult: {
            type: Object,
            default: () => { }
        },
        selectedPatient: {
            type: Object,
            default: () => { }
        }
    }
}
</script>