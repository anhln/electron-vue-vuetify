<template>
    <v-container>
        <v-row class="d-flex align-center">
            <h4>Profiles Directory</h4>
            <v-text-field
            dense
            outlined
            hide-details=""
            class="mx-2"
                v-model="profilesDirectory"
                type="text"
                placeholder="Enter a directory"
                @keyup.enter="openFolderDialog">
            </v-text-field>
            <v-btn class="mr-2 text-capitalize" @click="openFolderDialog">
                <v-icon left>mdi-dots-horizontal</v-icon>
                Browse
            </v-btn>
            <v-btn 
            :disabled="disabledBtnSave" 
            :loading="loading"
            @click="save" color="green" class="text-capitalize">
                <v-icon left>mdi-content-save</v-icon>
                Save</v-btn>
                
        </v-row>
       
    </v-container>
</template>

<script>
    export default {    
        data() {
            return {
                profilesDirectory: '',
                loading: false,
            }
        },
        computed: {
            disabledBtnSave(){
                return !this.profilesDirectory;
            }
        },
        async mounted(){
            this.profilesDirectory = await this.getProfilesDirectory() || 'Not set';
            console.log(this.profilesDirectory)
        },
        methods: {
            async getProfilesDirectory() {
                return await window.ipcRenderer.invoke("getProfilesDirectory");
            },
            updateProfilesDirectory(e) {
                this.profilesDirectory = e.target.value;
            },
            async openFolderDialog(){
                const [profileFolder] = await window.ipcRenderer.invoke("open-file-dialog", "Select Profiles Folder");
                if(profileFolder) this.profilesDirectory = profileFolder;
            },
            async save(){
                this.loading = true;
                const result = await window.ipcRenderer.invoke("save-profiles-directory", this.profilesDirectory);
                    this.loading = false;
                return result;
            }
        }
    }
</script>