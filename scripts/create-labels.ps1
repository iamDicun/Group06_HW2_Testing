# Run this script after installing GitHub CLI:
#   winget install GitHub.cli
# Then:
#   gh auth login
#   .\create-labels.ps1

$gh = "C:\Program Files\GitHub CLI\gh.exe"

$labels = @(
    # TYPE
    @{name="type: bug"; color="d73a4a"; description="Something isn't working"},
    @{name="type: test-case"; color="0e8a16"; description="Test case"},
    @{name="type: enhancement"; color="a2eeef"; description="New feature or request"},

    # SEVERITY
    @{name="severity: blocker"; color="b60205"; description="Blocks testing or deployment"},
    @{name="severity: critical"; color="d93f0b"; description="Core functionality broken"},
    @{name="severity: major"; color="f9d0c4"; description="Major feature broken"},
    @{name="severity: minor"; color="fef2c0"; description="Minor issue, workaround exists"},
    @{name="severity: trivial"; color="c5def5"; description="Cosmetic or low impact"},

    # PRIORITY
    @{name="priority: P0"; color="b60205"; description="Fix immediately"},
    @{name="priority: P1"; color="d93f0b"; description="Fix in current sprint"},
    @{name="priority: P2"; color="fbca04"; description="Fix in next sprint"},
    @{name="priority: P3"; color="c5def5"; description="Fix when possible"},

    # STATUS
    @{name="status: new"; color="5319e7"; description="Newly reported"},
    @{name="status: triaged"; color="006b75"; description="Confirmed and prioritized"},
    @{name="status: in progress"; color="fbca04"; description="Developer is fixing"},
    @{name="status: ready for retest"; color="1d76db"; description="Fix deployed, waiting for retest"},
    @{name="status: verified"; color="0e8a16"; description="Retest passed, bug closed"},

    # MODULE (all 19 features + mobile)
    @{name="module: register"; color="d4c5f9"; description="FR-01 Account Registration"},
    @{name="module: login"; color="d4c5f9"; description="FR-02 Login & Account Lockout"},
    @{name="module: forgot-pw"; color="d4c5f9"; description="FR-03 Forgot Password & Reset"},
    @{name="module: profile"; color="d4c5f9"; description="FR-04 Personal Profile"},
    @{name="module: product-search"; color="d4c5f9"; description="FR-05 Product Listing & Search"},
    @{name="module: product-detail"; color="d4c5f9"; description="FR-06 Product Detail View"},
    @{name="module: cart"; color="bfdadc"; description="FR-07 Shopping Cart"},
    @{name="module: checkout"; color="bfdadc"; description="FR-08 Checkout"},
    @{name="module: coupon"; color="bfdadc"; description="FR-09 Discount Coupons"},
    @{name="module: order-state"; color="bfdadc"; description="FR-10 Order State Machine"},
    @{name="module: order-history"; color="bfdadc"; description="FR-11 Order History View"},
    @{name="module: access-control"; color="f9d0c4"; description="FR-12 Access Control"},
    @{name="module: dashboard"; color="f9d0c4"; description="FR-13 Dashboard"},
    @{name="module: category-mgmt"; color="f9d0c4"; description="FR-14 Category Management"},
    @{name="module: product-mgmt"; color="f9d0c4"; description="FR-15 Product Management"},
    @{name="module: product-import"; color="f9d0c4"; description="FR-16 Product Import CSV"},
    @{name="module: coupon-mgmt"; color="f9d0c4"; description="FR-17 Coupon Management"},
    @{name="module: order-mgmt"; color="f9d0c4"; description="FR-18 Order Management"},
    @{name="module: user-mgmt"; color="f9d0c4"; description="FR-19 User Management"},
    @{name="module: mobile"; color="c5def5"; description="Pool D - Mobile App"},

    # TECHNIQUE
    @{name="technique: EP"; color="bfd4f2"; description="Equivalence Partitioning"},
    @{name="technique: BVA"; color="bfd4f2"; description="Boundary Value Analysis"},

    # RESULT
    @{name="result: pass"; color="0e8a16"; description="Test passed"},
    @{name="result: fail"; color="d73a4a"; description="Test failed"},
    @{name="result: blocked"; color="fbca04"; description="Test blocked"},
    @{name="found-by: test-case"; color="5319e7"; description="Bug found by a test case"}
)

$repo = "iamDicun/Group06_HW2_Testing"
foreach ($label in $labels) {
    Write-Host "Creating: $($label.name)"
    & $gh label create $label.name --repo $repo --color $label.color --description $label.description --force
    if (-not $?) { Write-Host "  FAILED: $($label.name)" }
}
Write-Host "`nDone! $(($labels).Count) labels created."
