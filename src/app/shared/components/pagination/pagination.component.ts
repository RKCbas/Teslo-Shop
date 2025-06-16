import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {

  totalPages = input<number>(0);
  currentPage = input<number>(1);

  getPagesList = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  })



}
