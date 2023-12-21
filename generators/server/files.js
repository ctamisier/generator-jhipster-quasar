const commonFiles = {
  global: [
    {
      templates: ['src/main/resources/banner.txt']
    }
  ]
};

export function writeFiles() {
  this.writeFilesToDisk(commonFiles, this, false);
}
