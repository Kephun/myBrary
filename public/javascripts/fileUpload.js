FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    stylePanelAspectRatio:150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150,
    imagePreviewMaxHeight: 10,
})

FilePond.parse(document.body);