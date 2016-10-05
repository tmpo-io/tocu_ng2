package main

type OpenClipart struct {
	Info struct {
		CurrentPage int `json:"current_page"`
		Pages       int `json:"pages"`
		Results     int `json:"results"`
	} `json:"info"`
	Msg     string `json:"msg"`
	Payload []struct {
		Created     string `json:"created"`
		Description string `json:"description"`
		DetailLink  string `json:"detail_link"`
		Dimensions  struct {
			PngFullLossy struct {
				Height int `json:"height"`
				Width  int `json:"width"`
			} `json:"png_full_lossy"`
			PngThumb struct {
				Height int `json:"height"`
				Width  int `json:"width"`
			} `json:"png_thumb"`
		} `json:"dimensions"`
		DownloadedBy int `json:"downloaded_by"`
		ID           int `json:"id"`
		Svg          struct {
			Png2400px    string `json:"png_2400px"`
			PngFullLossy string `json:"png_full_lossy"`
			PngThumb     string `json:"png_thumb"`
			URL          string `json:"url"`
		} `json:"svg"`
		SvgFilesize    int      `json:"svg_filesize"`
		Tags           string   `json:"tags"`
		TagsArray      []string `json:"tags_array"`
		Title          string   `json:"title"`
		TotalFavorites int      `json:"total_favorites"`
		Uploader       string   `json:"uploader"`
	} `json:"payload"`
}
