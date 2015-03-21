class LibrariesController < ApplicationController
  expose :library, attributes: :library_params
  expose(:libraries) { Library.order('LOWER(name) ASC') }
  expose(:libraries_rep) { LibraryDecorator.decorate_collection(libraries)}

  # GET /libraries
  def index
    render layout: "wide_content"
  end

  # GET /libraries/1
  def show
  end

  # GET /libraries/new
  def new
  end

  # GET /libraries/1/edit
  def edit
  end

  # POST /libraries
  def create
    if library.save
      redirect_to library, notice: 'Library was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /libraries/1
  def update
    if library.update(library_params)
      redirect_to library, notice: 'Library was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /libraries/1
  # DELETE /libraries/1.json
  def destroy
    library.destroy
    redirect_to libraries_url, notice: 'Library was successfully destroyed.'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def library_params
      params.require(:library).permit(:name,:short,:description,:url,:license,:latest_version,:web_standards,:support)
    end
end
